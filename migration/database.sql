CREATE TABLE profile (
    user_id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  is_superAdmin BOOLEAN,
  first_name CHAR(50),
  last_name CHAR(50),
  email VARCHAR(50),
  username VARCHAR(25),
  password VARCHAR(255),
  is_admin BOOLEAN,
  is_teamadmin BOOLEAN,
  referrer VARCHAR(25),
  points INT,
  user_code VARCHAR(25)
);

CREATE TABLE wall (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  post_user_id INT ,
  post_media VARCHAR(25),
  post_text VARCHAR(100),
  date DATE,
  time DATE
);

CREATE TABLE process_prospects (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    referrer_code VARCHAR(10),
    latest_unlock_page_id INT

);

CREATE TABLE process_pages (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name CHAR(50),
    title CHAR(50),
    summary CHAR(50),
    content VARCHAR(50),
    instruction VARCHAR(50)

);

CREATE TABLE prospect (
    referrer_code INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE referrer (
    username VARCHAR(40) NOT NULL
);

CREATE TABLE crm_users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    referrer_code VARCHAR(10)
);

CREATE TABLE crm_users_cadidates (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT

);

CREATE TABLE crm_candidates (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50),
  pipeline_id INT,
  leader_id INT,
  created_at TIMESTAMP default CURRENT_TIMESTAMP

);


CREATE TABLE crm_uploads(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT,
  file_name CHAR(20)
);

CREATE TABLE crm_tasks (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pipeline_id INT,
  title VARCHAR(50),
  description VARCHAR(100),
  date_time DATE
);

CREATE TABLE crm_posts(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pipeline_id INT,
  user_id INT,
  post VARCHAR(100),
  date_time DATE

);

CREATE TABLE crm_org (
  id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE crm_users_org (
  org_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT
);

CREATE TABLE crm_storage (
  storage_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id INT 
  
);

CREATE TABLE crm_storage_folders (
  owner_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  folder_id INT,
  storage_id INT ,
  title VARCHAR(50)
);

CREATE TABLE crm_storage_folders_users(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    source_id INT
);

CREATE TABLE crm_storage_users_storage(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  source_id INT
);

CREATE TABLE crm_storage_files(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  source_id INT,
  file CHAR(20)
);

CREATE TABLE ecrm_users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    referrer_code VARCHAR(10)

);

CREATE TABLE ecrm_tasks(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pipeline_id INT,
  title CHAR(50),
  description VARCHAR(50),
  date_time DATE
  

);

CREATE TABLE ecrm_org(
  contact_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  leader_id INT, 
  position CHAR(25)

);

CREATE TABLE ecrm_contacts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name CHAR(50),
  email VARCHAR(30),
  phone INT,
  company_name CHAR(50),
  company_title CHAR(50),
  address_street CHAR(50),
  address_city CHAR(25),
  address_state CHAR(25),
  address_zip CHAR(20),
  address_country CHAR(15),
  website CHAR(20),
  birthday DATE,
  background_info VARCHAR(20),
  status VARCHAR(20),
  priority INT

);

CREATE TABLE ecrm_events (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title CHAR(50),
  description CHAR(50),
  date DATE,
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP

);

CREATE TABLE ecrm_projects(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  leader_id INT,
  title VARCHAR(50),
  parent_project_id INT,
  FOREIGN KEY (parent_project_id) REFERENCES ecrm_projects(id)
);

CREATE TABLE ecrm_users_projects (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  project_id INT

);

CREATE TABLE ecrm_pipelines (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  project_id INT ,
   title CHAR(50)

);

CREATE TABLE ecrm_users_pipelines(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
  pipeline_id INT
);

CREATE TABLE ecrm_posts(
  pipeline_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT ,
  post VARCHAR(100),
  date_time DATE
);

CREATE TABLE ecrm_folders(
  title CHAR(50),
  pipeline_id INT PRIMARY KEY

);

CREATE TABLE ecrm_users_folders(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  folder_id INT 
);

CREATE TABLE ecrm_uploads(
  folder_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  file_name CHAR(25)
);

CREATE TABLE ecrm_inbox (
  sender_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  receiver_id INT ,
  subject CHAR(25),
  message VARCHAR(100)

);

CREATE TABLE crm_community_tasks (
    id INT NOT NULL,
    name VARCHAR(40),
    description VARCHAR(40),
    date DATE
);

CREATE TABLE crm_community_users_tasks (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  task_id INT,
  completed CHAR(8),
  date DATE

);

CREATE TABLE crm_calendar_users(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  invited_id INT,
  events CHAR(50),
  calendar_owner CHAR(50),
  date DATE
);

CREATE TABLE crm_contacts (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50),
  phone CHAR(8),
  company_name VARCHAR(50),
  company_title VARCHAR(50),
  address_street CHAR(50),
  address_city CHAR(18),
  address_state CHAR(18),
  address_zip CHAR(18),
  address_country CHAR(18),
  website VARCHAR(8),
  birthday VARCHAR(8),
  background_info CHAR(50),
  status VARCHAR(50),
  priority INT
);

CREATE TABLE crm_events (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50),
  description VARCHAR(100),
  date DATE,
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time DATE

);

CREATE TABLE crm_users_projects(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  project_id INT

);

CREATE TABLE crm_pipelines (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  title VARCHAR(50)

);

CREATE TABLE crm_inbox (
  sender_id INT PRIMARY KEY,
  receiver_id INT, 
  subject CHAR(50),
  message VARCHAR(150),
  message_id INT
);

CREATE TABLE crm_voicemail(
  owner_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  voicemail_id INT

);

CREATE TABLE crm_voicemail_files(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  source_id INT,
  file CHAR(25),
  date DATE,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_voicemail_users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  source_id INT
);

CREATE TABLE crm_voicemail_folders(
  owner_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title CHAR(50),
  voicemail_id INT

);

CREATE TABLE crm_voicemail_folders_users(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  source_id INT
);

CREATE TABLE crm_voicemail_folder_files(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  file CHAR(25),
  date DATE,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_wall_users (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  invited_id INT NOT NULL 
);

CREATE TABLE feedbacks (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  app_id INT
);

CREATE TABLE apps (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title CHAR(50),
  `key` INT,
  route CHAR(25)
);

CREATE TABLE users_apps(
  app_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT
);

CREATE TABLE backoffice_intro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    secondary_title VARCHAR(50),
    intro_summary VARCHAR(100),
    mission_summary VARCHAR(100),
    about_summary VARCHAR(100)
);

CREATE TABLE backoffice_setup(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    secondary_title VARCHAR(200),
    steps_summary VARCHAR(200),
    step1_title VARCHAR(100),
    step1_description VARCHAR(200),
    step2_title VARCHAR(100),
    step2_description VARCHAR(200),
    step3_title VARCHAR(100),
    step3_description VARCHAR(200),
    step4_title VARCHAR(100),
    step4_description VARCHAR(200)
);

CREATE TABLE blogs (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT ,
    title VARCHAR(50),
    body VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 

);

CREATE TABLE blog_comments (
  blog_id INT NOT NULL ,
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  comment VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE inbox (
  owner_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  message_id INT,
  sender_id INT,
  message VARCHAR(150),
  date DATE,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interview_users (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  referrer_code INT
);

CREATE TABLE interview_pages (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name CHAR(50),
  title CHAR(50),
  summary CHAR(50),
  content VARCHAR(50),
  instruction VARCHAR(50)
);

CREATE TABLE interview_accesscodes (
  code INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  accesscode_title CHAR(20),
  accesscode_summary CHAR(25),
  page_id INT

);

CREATE TABLE interview_questions(
  page_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  question VARCHAR(50)
);

CREATE TABLE linkstore_users(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  referrer_code INT 
);

CREATE TABLE linkstore_folders (
  title CHAR(50),
  leader_id INT PRIMARY KEY  
);

CREATE TABLE linkstore_users_folders (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  folder_id INT
);

CREATE TABLE linkstore_link (
  folder_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  title CHAR(50),
  url VARCHAR(25)

);

CREATE TABLE ledger (
  id INT AUTO_INCREMENT PRIMARY KEY,
  to_user CHAR(25),
  to_user_amount INT,
  from_user CHAR(25)
);

CREATE TABLE process_multiplechoices(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  mc_question VARCHAR(50),
  a CHAR(50),
  b CHAR(50),
  c CHAR(50),
  d CHAR(50),
  correct_answer CHAR(50),
  page_id INT 
);

CREATE TABLE process_questions (
  page_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(50)
);

CREATE TABLE friends_list (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id INT,
  friend_id INT ,
  approved INT

);

CREATE TABLE wall (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  post_user_id INT,
  post_text CHAR(50),
  date DATE,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  app CHAR(50)
);

CREATE TABLE profile_media_photos(
  owner_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(50),
  migrated INT
);

CREATE TABLE profile_media_videos(
  owner_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  video VARCHAR(25),
  migrated INT
);

CREATE TABLE storage_users(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  referrer_code INT 
);

CREATE TABLE storage(
  owner_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  storage_id INT

);

CREATE TABLE storage_users_storage(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  source_id INT
);

CREATE TABLE storage_files(
  source_id INT NOT NULl AUTO_INCREMENT PRIMARY KEY,
  file CHAR(25)
);

CREATE TABLE storage_folders (
  owner_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title CHAR(25),
  storage_id INT 
);

CREATE TABLE storage_folders_users(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  source_id INT
);

CREATE TABLE storage_folders_files(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  file CHAR(25),
  source_id INT 
);

CREATE TABLE profile_personal_info(
  user_id INT NOT NULl AUTO_INCREMENT PRIMARY KEY,
  birthday DATE,
  height INT,
  eye_color CHAR(10),
  hair_color CHAR(10),
  religion VARCHAR(12),
  smoke CHAR(10),
  drink CHAR(10),
  company VARCHAR(20),
  job_title CHAR(20),
  nationality CHAR(15),
  language CHAR(15),
  children INT,
  description VARCHAR(25),
  favorite CHAR(25),
  hobby CHAR(25),
  skill CHAR(25),
  dream CHAR(25),
  quote VARCHAR(25),
  event VARCHAR(25),
  family CHAR(20),
  `group` CHAR(15),
  education CHAR(25),
  `like` CHAR(20),
  philosophy VARCHAR(25),
  status CHAR(25),
  question VARCHAR(25),
  career VARCHAR(20),
  real_me CHAR(20),
  business VARCHAR(25),
  my_life CHAR(25),
  goal CHAR(25),
  life_line CHAR(25),
  pet CHAR(25)

);

CREATE TABLE crm_storage_folder_files (
  source_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  isLeader BOOLEAN,
  file CHAR(25)
);
