CREATE TABLE IF NOT EXISTS agency_details (
  agency_id INTEGER PRIMARY KEY,
  secretary_official_id INTEGER,
  secretary_assumed_date TEXT NOT NULL,
  secretary_tenure_years INTEGER NOT NULL,
  top_accomplishments TEXT NOT NULL,
  core_contributions TEXT NOT NULL,
  total_budget INTEGER NOT NULL,
  utilized_funds INTEGER NOT NULL,
  unutilized_surplus INTEGER NOT NULL,
  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agency_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  phase_label TEXT NOT NULL,
  completion_percent INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS agency_news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agency_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  category TEXT NOT NULL,
  published_at TEXT NOT NULL,
  summary TEXT NOT NULL,
  url TEXT NOT NULL,
  is_fact_check INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS coa_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agency_id INTEGER NOT NULL,
  audit_opinion TEXT NOT NULL,
  exception_percent INTEGER NOT NULL,
  resolved_percent INTEGER NOT NULL,
  recommendations_total INTEGER NOT NULL,
  notes TEXT NOT NULL,
  as_of_date TEXT NOT NULL,
  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS procurements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agency_id INTEGER NOT NULL,
  project_name TEXT NOT NULL,
  contractor_name TEXT NOT NULL,
  approved_budget INTEGER NOT NULL,
  expected_completion_date TEXT NOT NULL,
  status TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
);