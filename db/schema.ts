import { pgTable, uuid, text, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define Enums
export const ticketStatusEnum = pgEnum('ticket_status', ['todo', 'in_progress', 'done', 'backlog']);
export const ticketPriorityEnum = pgEnum('ticket_priority', ['low', 'medium', 'high']);
export const llmInteractionTypeEnum = pgEnum('llm_interaction_type', ['summary', 'suggestion', 'response_gen']);

// Users Table (integrated with Supabase Auth)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(), // Supabase Auth user ID
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Projects Table
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  ownerId: uuid('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }), // Foreign key to users
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Tickets Table (Kanban Cards)
export const tickets = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }), // Foreign key to projects
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: ticketStatusEnum('status').notNull().default('todo'),
  priority: ticketPriorityEnum('priority'),
  assigneeId: uuid('assignee_id').references(() => users.id, { onDelete: 'set null' }), // Foreign key to users, nullable
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Comments Table
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketId: uuid('ticket_id').notNull().references(() => tickets.id, { onDelete: 'cascade' }), // Foreign key to tickets
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }), // Foreign key to users
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// LLM Interactions Table (for logging/auditing LLM calls)
export const llmInteractions = pgTable('llm_interactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  ticketId: uuid('ticket_id').references(() => tickets.id, { onDelete: 'set null' }), // Optional: link to a specific ticket
  interactionType: llmInteractionTypeEnum('interaction_type').notNull(),
  requestPayload: text('request_payload').notNull(), // Store JSON string of request
  responsePayload: text('response_payload').notNull(), // Store JSON string of response
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Define relations for Drizzle ORM to enable easier querying with joins
export const relationsConfig = relations(users, ({ many }) => ({
  projects: many(projects),
  tickets: many(tickets),
  comments: many(comments),
  llmInteractions: many(llmInteractions),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, { fields: [projects.ownerId], references: [users.id] }),
  tickets: many(tickets),
}));

export const ticketRelations = relations(tickets, ({ one, many }) => ({
  project: one(projects, { fields: [tickets.projectId], references: [projects.id] }),
  assignee: one(users, { fields: [tickets.assigneeId], references: [users.id] }),
  comments: many(comments),
  llmInteractions: many(llmInteractions),
}));

export const commentRelations = relations(comments, ({ one }) => ({
  ticket: one(tickets, { fields: [comments.ticketId], references: [tickets.id] }),
  user: one(users, { fields: [comments.userId], references: [users.id] }),
}));

export const llmInteractionRelations = relations(llmInteractions, ({ one }) => ({
  user: one(users, { fields: [llmInteractions.userId], references: [users.id] }),
  ticket: one(tickets, { fields: [llmInteractions.ticketId], references: [tickets.id] }),
}));
