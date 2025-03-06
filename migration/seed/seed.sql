INSERT INTO users (
  first_name,
  last_name,
  is_superAdmin,
  email,
  username,
  points,
  password,
  is_teamadmin
  ) VALUES (
  'trewelu',
  'ta',
  true,
  'theloiagj@ja.com',
  'zoro',
  15,
  'thelogok',
  true
);

INSERT INTO backoffice_setup (
  title,
  secondary_title,
  steps_summary,
  step1_title,
  step1_description,
  step2_title,
  step2_description,
  step3_title,
  step3_description,
  step4_title,
  step4_description
  ) VALUES (
  'Setup Page',
  'the purpose of this page is to create another apps',
  'after step site instructions',
  'this section is to enter the app code',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Lorem ipsum dolor sit amet',
  'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
  'In semper viverra turpis eget lobortis.',
  'Suspendisse eu aliquet sapien. Mauris sed sapien orci.',
  'Interdum et malesuada fames ac ante ipsum primis in faucibus.',
  'sit amet lobortis leo hendrerit ut. Integer sed nibh pretium, '
);

INSERT INTO backoffice_intro (
  title,
  secondary_title,
  intro_summary,
  mission_summary,
  about_summary
  ) VALUES (
  'all about backoffice',
  'backoffice introduction',
  'the purpose of this platform is to connect people',
  'and organize all their agenda',
  'this apps is created by josh omni (joshua bhoopsingh)'
);

INSERT INTO apps (
  title,
  `key`,
  route
  ) VALUES (
  'points',
  0,
  'public-ledger'
);

INSERT INTO apps (
  title,
  `key`,
  route
  ) VALUES (
  'office',
  1,
  'office'
);


INSERT INTO apps (
  title,
  `key`,
  route
  ) VALUES (
  'linkstore',
  2,
  'linkstore'
);

INSERT INTO apps (
  title,
  `key`,
  route
  ) VALUES (
  'interview',
  3,
  'interview'
);

INSERT INTO apps (
  title,
  `key`,
  route
  ) VALUES (
  'storage',
  4,
  'storage'
);

INSERT INTO apps (
  title,
  `key`,
  route
  ) VALUES (
  'crm',
  5,
  'onlineoffice'
);

INSERT INTO apps (
  title,
  `key`,
  route
  ) VALUES (
  'ecrm',
  6,
  'office'
);


INSERT INTO apps (
  title,
  `key`,
  route
  ) VALUES (
  'blog',
  7,
  'blog'
);

INSERT INTO apps (
  title,
  `key`,
  route
  ) VALUES (
  'process',
  8,
  'opportunity'
);

INSERT INTO process_prospects (
    user_id,
    referrer_code,
    latest_unlock_page_id
    ) VALUES (
    3,
    'H1y1nO11w',
    3
  );

  INSERT INTO process_multiplechoices (
    id,
    mc_question,
    a,
    b,
    c,
    d,
    correct_answer,
    page_id
    ) VALUES (
    1,
    'how many legs does spider have?',
    '4',
    '6',
    '8',
    '10',
    'c',
    3
  );

  INSERT INTO profile_personal_info (
    user_id,
    eye_color,
    smoke,
    favorite,
    hobby,
    skill
    ) VALUES (
    3,
    'black',
    'heavily',
    'guitar play',
    'writing code for fun',
    'Golang DEvOps'
  );

  INSERT INTO profile (
      user_id
      ) VALUE (
      11
    );

  INSERT INTO process_pages (
    id,
    name,
    title,
    summary,
    content,
    instruction
    ) VALUES (
    3,
    'introduction',
    'TI',
    'SOME GUY with it background',
    'all about computer stuff',
    'some awesome content'
  );

  INSERT INTO referrer (
    username
    ) VALUES (
    'Portgaz D ace'
  )

  INSERT INTO crm_users (
    user_id,
    referrer_code
    ) VALUES (
    3,
    'H1y1nO11w'
  );

  INSERT INTO ecrm_users (
    user_id,
    referrer_code
    ) VALUES (
    3,
    'H1y1nO11w'
  );

  INSERT INTO blogs (
    id,
    user_id,
    title,
    body
    ) VALUES (
    8,
    3,
    'a blog title',
    'this is the body content'
  );

  INSERT INTO crm_voicemail (
    first_name,
    voicemail_id
    ) VALUES (
    'nyobi',
    6
  );

  INSERT INTO crm_community_tasks (
    id,
    name,
    description,
    date
    ) VALUES (
    3,
    'business opportunity plan',
    'opportunity',
    '2020-07-07 10:10:01'
    ) , (
    3,
   'own your products',
  ' products',
    '2020-07-07 10:10:01'
  ), (
  3,
'whole share retail customers',
'retails',
    '2020-07-07 10:10:01'
),(
3,
'listening',
'listing',
    '2020-07-07 10:10:01'
), (
3,
'reading',
'reading',
    '2020-07-07 10:10:01'
),(
3,
'meetings',
'meet',
    '2020-07-07 10:10:01'
),(
  3,
'communication',
'comm',
    '2020-07-07 10:10:01'
), (
3,
'good for your words',
'words',
    '2020-07-07 10:10:01'
),(
  3,
  'get advice',
  'advicer',
    '2020-07-07 10:10:01'
  ), (
  3,
  'support' , 
  'support',
    '2020-07-07 10:10:01'
);

INSERT INTO crm_calendar_users (
  invited_id,
  events,
  calendar_owner,
  date
  ) VALUES (
  3,
  3,
  'nyobi',
    '2020-07-07 10:10:01'
  ), (
  2,
  2,
  'nyobi',
    '2020-07-07 10:10:01'
  ), (
  6,
  6,
  'nyobi',
    '2020-07-07 10:10:01'
);

INSERT INTO crm_storage (
  storage_id,
  owner_id
  ) VALUES (
  3,
  3
);

INSERT INTO crm_storage_users_storage (
  user_id,
  source_id
  ) VALUES (
  3,
  3
)
