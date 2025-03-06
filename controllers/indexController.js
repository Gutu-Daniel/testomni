const db = require("../db"),
  nodemailer = require("nodemailer");
const axios = require('axios');

const stripeSecretKey = 'sk_test_51OFfmqLty5p4mlSDLC08VlzTvnZM0Syelr4OnOaUAEUg4fMROYU3KixRyN3lYGEeKhy660kgEx27B0Zh0x8B19x100RTCf6xr2'; // Your Stripe secret key
const sessionId = process.env.STRIPE_TEST_SESSION_ID; // The session ID from the query


async function retrieveCheckoutSession(sessionId) {
  try {
    const response = await axios.get(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving checkout session:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to retrieve a subscription
async function retrieveSubscription(subscriptionId) {
  try {
    const response = await axios.get(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving subscription:', error.response ? error.response.data : error.message);
    throw error;
  }
}
// Define static pages based on user type
const getStaticPages = (isSuperAdmin, userId) => {
  const commonPages = [
    { title: 'Payment', route: 'payment', isStatic: true },
    {
      title: 'Settings',
      route: `mainsettings/${userId}`,
      isStatic: true,
      section: 'settings',
      tabs: [
        { title: 'Profile Image', route: 'profile-img' },
        { title: 'Account Info', route: 'account-info' },
        { title: 'Tell a Friend', route: 'refer' }
      ]
    },
    { title: 'Subscription', route: 'manage-subscription', isStatic: true },
    { title: 'Inbox', route: 'inbox', isStatic: true },
    { title: 'Browser', route: 'browser', isStatic: true }
  ];

  // Profile sections available to all users
  const profilePages = [
    { title: 'About', route: `profile/${userId}/about`, isStatic: true, section: 'profile' },
    { title: 'Friends', route: `profile/${userId}/friends`, isStatic: true, section: 'profile' },
    { title: 'Invite Friends', route: `profile/${userId}/invitefriend`, isStatic: true, section: 'profile' },
    { title: 'Postings', route: `profile/${userId}/wall`, isStatic: true, section: 'profile' },
    { title: 'Photos & Videos', route: `profile/${userId}/media`, isStatic: true, section: 'profile' },
    { title: 'Last Used Apps', route: `profile/${userId}/content`, isStatic: true, section: 'profile' },
    { title: 'Profile Settings', route: `profile/${userId}/settings`, isStatic: true, section: 'profile' }
  ];

  // Office sections
  const officePages = [
    { title: 'Dashboard', route: 'office/dashboard', isStatic: true, section: 'office', icon: 'fa-pencil-square-o' },
    { title: 'Organization', route: 'office/organization', isStatic: true, section: 'office', icon: 'fa-handshake-o' },
    { title: 'Contacts', route: 'office/contacts', isStatic: true, section: 'office', icon: 'fa-address-book-o' },
    { title: 'Calendar', route: 'office/calendar', isStatic: true, section: 'office', icon: 'fa-calendar-check-o' },
    { title: 'Projects', route: 'office/projects', isStatic: true, section: 'office', icon: 'fa-paper-plane-o' },
    { title: 'Office Inbox', route: 'office/inbox', isStatic: true, section: 'office', icon: 'fa-envelope-o' },
    { title: 'Whiteboard', route: 'office/whiteboard', isStatic: true, section: 'office', icon: 'fa-pencil-square-o' },
    { title: 'Office Settings', route: 'office/settings', isStatic: true, section: 'office', icon: 'fa-cog' }
  ];

  // Online Office sections
  const onlineOfficePages = [
    { title: 'Dashboard', route: 'onlineoffice/dashboard', isStatic: true, section: 'onlineoffice', icon: 'fa-pencil-square-o' },
    { title: 'Organization', route: 'onlineoffice/organization', isStatic: true, section: 'onlineoffice', icon: 'fa-handshake-o' },
    { title: 'Contacts', route: 'onlineoffice/contacts', isStatic: true, section: 'onlineoffice', icon: 'fa-address-book-o' },
    { title: 'Calendar', route: `onlineoffice/calendar/${userId}`, isStatic: true, section: 'onlineoffice', icon: 'fa-calendar-check-o' },
    { title: 'Task Grid', route: `onlineoffice/communitytasks/${userId}`, isStatic: true, section: 'onlineoffice', icon: 'fa-calendar-check-o' },
    { title: 'Projects', route: 'onlineoffice/projects', isStatic: true, section: 'onlineoffice', icon: 'fa-paper-plane-o' },
    { title: 'Storage', route: `onlineoffice/storage/${userId}`, isStatic: true, section: 'onlineoffice', icon: 'fa-archive' },
    { title: 'Videomail', route: `onlineoffice/voicemail/${userId}`, isStatic: true, section: 'onlineoffice', icon: 'fa-video-camera' },
    { title: 'Inbox', route: 'onlineoffice/inbox', isStatic: true, section: 'onlineoffice', icon: 'fa-envelope-o' },
    { title: 'Payment', route: 'onlineoffice/payment', isStatic: true, section: 'onlineoffice', icon: 'fa-credit-card-alt' },
    { title: 'Whiteboard', route: 'onlineoffice/whiteboard', isStatic: true, section: 'onlineoffice', icon: 'fa-pencil-square-o' },
    { title: 'Settings', route: 'onlineoffice/settings', isStatic: true, section: 'onlineoffice', icon: 'fa-cog' }
  ];

  if (isSuperAdmin) {
    // Add backoffice sections for superAdmin
    const backofficePages = [
      { title: 'Backoffice', route: 'backoffice', isStatic: true, section: 'backoffice' },
      { title: 'All Users', route: 'backoffice#all-users', isStatic: true, section: 'backoffice' },
      { title: 'Point System', route: 'backoffice#point-system', isStatic: true, section: 'backoffice' },
      { title: 'Prospects', route: 'backoffice#process', isStatic: true, section: 'backoffice' },
      { title: 'Process CRM', route: 'backoffice#process-crm', isStatic: true, section: 'backoffice' },
      { title: 'Office CRM', route: 'backoffice#office-crm', isStatic: true, section: 'backoffice' },
      // User Suggestions sections
      { title: 'Profile Feedback', route: 'backoffice#profile-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
      { title: 'Points Feedback', route: 'backoffice#points-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
      { title: 'Process Feedback', route: 'backoffice#process-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
      { title: 'Process CRM Feedback', route: 'backoffice#crm-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
      { title: 'Office CRM Feedback', route: 'backoffice#ecrm-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
      { title: 'Link Store Feedback', route: 'backoffice#link-store-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
      { title: 'Interview Feedback', route: 'backoffice#interview-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
      { title: 'Storage Feedback', route: 'backoffice#storage-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
      // Site Setup sections
      { title: 'Introduction', route: 'backoffice/introduction', isStatic: true, section: 'backoffice', group: 'setup' },
      { title: 'Setup', route: 'backoffice/setup', isStatic: true, section: 'backoffice', group: 'setup' }
    ];
    return [...backofficePages, ...profilePages, ...officePages, ...onlineOfficePages, ...commonPages];
  }
  return [...profilePages, ...officePages, ...onlineOfficePages, ...commonPages];
};

exports.indexPage = (req, res) => {
  if (req.user.is_superAdmin) {


    console.log("check", req.user)

    db("apps")
      .select("*")
      .then((apps) => {
        res.render("index", { currentUser: req.user, apps: apps });
        console.log("apps", apps)

      })
  } else {
    // console.log("wewewe11",req.user)
    db("users_apps")
      .innerJoin("apps", "users_apps.app_id", "apps.id")
      .where("user_id", req.user.id)
      .then((apps) => {
        console.log("")
        res.render("index", { currentUser: req.user, apps: apps });
      })
  }
}

exports.getSuggestions = (req, res) => {
  const searchKey = req.query.key.toLowerCase();
  const staticPages = getStaticPages(req.user.is_superAdmin);
  
  if (req.user.is_superAdmin) {
    db("apps")
      .select("*")
      .then(apps => {
        const allItems = [...apps, ...staticPages];
        const suggestions = allItems
          .filter(item => item.title.toLowerCase().includes(searchKey))
          .map(item => item.title)
          .slice(0, 5); // Limit to 5 suggestions
        
        res.json(suggestions);
      });
  } else {
    db("users_apps")
      .innerJoin("apps", "users_apps.app_id", "apps.id")
      .where("user_id", req.user.id)
      .then(apps => {
        const allItems = [...apps, ...staticPages];
        const suggestions = allItems
          .filter(item => item.title.toLowerCase().includes(searchKey))
          .map(item => item.title)
          .slice(0, 5); // Limit to 5 suggestions
        
        res.json(suggestions);
      });
  }
};

exports.searchApps = (req, res) => {
  const searchKey = req.body.key.toLowerCase();

  // Define static pages based on user type
  const getStaticPages = (isSuperAdmin) => {
    const commonPages = [
      { title: 'Payment', route: 'payment', isStatic: true },
      {
        title: 'Settings',
        route: `mainsettings/${req.user.id}`,
        isStatic: true,
        section: 'settings',
        tabs: [
          { title: 'Profile Image', route: 'profile-img' },
          { title: 'Account Info', route: 'account-info' },
          { title: 'Tell a Friend', route: 'refer' }
        ]
      },
      { title: 'Subscription', route: 'manage-subscription', isStatic: true },
      { title: 'Inbox', route: 'inbox', isStatic: true },
      { title: 'Browser', route: 'browser', isStatic: true }
    ];

    // Profile sections available to all users
    const profilePages = [
      { title: 'About', route: `profile/${req.user.id}/about`, isStatic: true, section: 'profile' },
      { title: 'Friends', route: `profile/${req.user.id}/friends`, isStatic: true, section: 'profile' },
      { title: 'Invite Friends', route: `profile/${req.user.id}/invitefriend`, isStatic: true, section: 'profile' },
      { title: 'Postings', route: `profile/${req.user.id}/wall`, isStatic: true, section: 'profile' },
      { title: 'Photos & Videos', route: `profile/${req.user.id}/media`, isStatic: true, section: 'profile' },
      { title: 'Last Used Apps', route: `profile/${req.user.id}/content`, isStatic: true, section: 'profile' },
      { title: 'Profile Settings', route: `profile/${req.user.id}/settings`, isStatic: true, section: 'profile' }
    ];

    // Office sections
    const officePages = [
      { title: 'Dashboard', route: 'office/dashboard', isStatic: true, section: 'office', icon: 'fa-pencil-square-o' },
      { title: 'Organization', route: 'office/organization', isStatic: true, section: 'office', icon: 'fa-handshake-o' },
      { title: 'Contacts', route: 'office/contacts', isStatic: true, section: 'office', icon: 'fa-address-book-o' },
      { title: 'Calendar', route: 'office/calendar', isStatic: true, section: 'office', icon: 'fa-calendar-check-o' },
      { title: 'Projects', route: 'office/projects', isStatic: true, section: 'office', icon: 'fa-paper-plane-o' },
      { title: 'Office Inbox', route: 'office/inbox', isStatic: true, section: 'office', icon: 'fa-envelope-o' },
      { title: 'Whiteboard', route: 'office/whiteboard', isStatic: true, section: 'office', icon: 'fa-pencil-square-o' },
      { title: 'Office Settings', route: 'office/settings', isStatic: true, section: 'office', icon: 'fa-cog' }
    ];

    // Online Office sections
    const onlineOfficePages = [
      { title: 'Dashboard', route: 'onlineoffice/dashboard', isStatic: true, section: 'onlineoffice', icon: 'fa-pencil-square-o' },
      { title: 'Organization', route: 'onlineoffice/organization', isStatic: true, section: 'onlineoffice', icon: 'fa-handshake-o' },
      { title: 'Contacts', route: 'onlineoffice/contacts', isStatic: true, section: 'onlineoffice', icon: 'fa-address-book-o' },
      { title: 'Calendar', route: `onlineoffice/calendar/${req.user.id}`, isStatic: true, section: 'onlineoffice', icon: 'fa-calendar-check-o' },
      { title: 'Task Grid', route: `onlineoffice/communitytasks/${req.user.id}`, isStatic: true, section: 'onlineoffice', icon: 'fa-calendar-check-o' },
      { title: 'Projects', route: 'onlineoffice/projects', isStatic: true, section: 'onlineoffice', icon: 'fa-paper-plane-o' },
      { title: 'Storage', route: `onlineoffice/storage/${req.user.id}`, isStatic: true, section: 'onlineoffice', icon: 'fa-archive' },
      { title: 'Videomail', route: `onlineoffice/voicemail/${req.user.id}`, isStatic: true, section: 'onlineoffice', icon: 'fa-video-camera' },
      { title: 'Inbox', route: 'onlineoffice/inbox', isStatic: true, section: 'onlineoffice', icon: 'fa-envelope-o' },
      { title: 'Payment', route: 'onlineoffice/payment', isStatic: true, section: 'onlineoffice', icon: 'fa-credit-card-alt' },
      { title: 'Whiteboard', route: 'onlineoffice/whiteboard', isStatic: true, section: 'onlineoffice', icon: 'fa-pencil-square-o' },
      { title: 'Settings', route: 'onlineoffice/settings', isStatic: true, section: 'onlineoffice', icon: 'fa-cog' }
    ];

    if (isSuperAdmin) {
      // Add backoffice sections for superAdmin
      const backofficePages = [
        { title: 'Backoffice', route: 'backoffice', isStatic: true, section: 'backoffice' },
        { title: 'All Users', route: 'backoffice#all-users', isStatic: true, section: 'backoffice' },
        { title: 'Point System', route: 'backoffice#point-system', isStatic: true, section: 'backoffice' },
        { title: 'Prospects', route: 'backoffice#process', isStatic: true, section: 'backoffice' },
        { title: 'Process CRM', route: 'backoffice#process-crm', isStatic: true, section: 'backoffice' },
        { title: 'Office CRM', route: 'backoffice#office-crm', isStatic: true, section: 'backoffice' },
        // User Suggestions sections
        { title: 'Profile Feedback', route: 'backoffice#profile-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
        { title: 'Points Feedback', route: 'backoffice#points-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
        { title: 'Process Feedback', route: 'backoffice#process-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
        { title: 'Process CRM Feedback', route: 'backoffice#crm-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
        { title: 'Office CRM Feedback', route: 'backoffice#ecrm-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
        { title: 'Link Store Feedback', route: 'backoffice#link-store-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
        { title: 'Interview Feedback', route: 'backoffice#interview-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
        { title: 'Storage Feedback', route: 'backoffice#storage-app', isStatic: true, section: 'backoffice', group: 'suggestions' },
        // Site Setup sections
        { title: 'Introduction', route: 'backoffice/introduction', isStatic: true, section: 'backoffice', group: 'setup' },
        { title: 'Setup', route: 'backoffice/setup', isStatic: true, section: 'backoffice', group: 'setup' }
      ];
      return [...backofficePages, ...profilePages, ...officePages, ...onlineOfficePages, ...commonPages];
    }
    return [...profilePages, ...officePages, ...onlineOfficePages, ...commonPages];
  };

  let appsPromise;

  if (req.user.is_superAdmin) {
    appsPromise = db("apps")
      .select("*")
      .then(apps => {
        const staticPages = getStaticPages(true);
        const allItems = [...apps, ...staticPages];

            // Include tabs in the search results
      const searchResults = allItems.flatMap(item => {
        if (item.title.toLowerCase().includes(searchKey)) {
          return [item];
        }
        if (item.tabs) {
          const matchingTabs = item.tabs.filter(tab => tab.title.toLowerCase().includes(searchKey));
          if (matchingTabs.length > 0) {
            return [{ ...item, tabs: matchingTabs }];
          }
        }
        return [];
      });
      console.log("searchResults", searchResults[0].tabs)

        return {
          results: searchResults,
          isSuperAdmin: true
        };
      });
  } else {
    appsPromise = db("users_apps")
      .innerJoin("apps", "users_apps.app_id", "apps.id")
      .where("user_id", req.user.id)
      .then(apps => {
        const staticPages = getStaticPages(false);
        const allItems = [...apps, ...staticPages];

        const searchResults = allItems.filter(item =>
          item.title.toLowerCase().includes(searchKey)
        );

        return {
          results: searchResults,
          isSuperAdmin: false
        };
      });
  }

  appsPromise
    .then(({ results, isSuperAdmin }) => {
      res.render("search", {
        currentUser: req.user,
        apps: results,
        searchKey: req.body.key,
        isSuperAdmin: isSuperAdmin
      });
    })
    .catch(err => {
      console.error(err);
      res.redirect("/");
    });
}
exports.introPage = (req, res) => {
  db("backoffice_intro")
    .first()
    .then(introText => res.render("introPage", { currentUser: req.user, introText }))
}

exports.setupPage = (req, res) => {
  db("backoffice_setup")
    .first()
    .then(setupText => res.render("setupPage", { currentUser: req.user, setupText }))
}

exports.setupPage2 = (req, res) => {
  res.render("setupPage2", { currentUser: req.user });
}

exports.setupPage3 = (req, res) => {
  res.render("setupPage3", { currentUser: req.user });
}

exports.addApp = (req, res) => {
  db("apps")
    .insert({
      title: req.body.title,
      route: req.body.route,
      key: req.body.key
    })
    .then(() => {
      res.redirect("back")
    })
}

exports.userFeedback = (req, res) => {
  db("feedbacks")
    .insert({
      app_id: req.params.app_id,
      user_id: req.user.id,
      feedback: req.body.feedback
    })
    .then(() => {
      req.flash("sucess", "Thank you for submitting your feedback. We greatly appreciate it and will work to better Omnilives");
      res.redirect("back")
    })
}

exports.uniSettings = (req, res) => {
  db("users")
    .innerJoin("profile", "users.id", "profile.user_id")
    .where("user_id", req.params.user_id)
    .then((userInfo) => {
      res.render("main-settings", { currentUser: req.user, userInfo })
    })
}

exports.referRegistration = (req, res, next) => {
  db("users")
    .where("id", req.params.user_id)
    .first()
    .then((user) => {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: "siromni.com@gmail.com",
          pass: "pvkvlnqqyuhohrcc"
        }
      });

      let message = `<p>Hi ${req.body.friend_name},</p>
            <p>You've been invited to join SirOmni.</p>
            <p>You can register here: <a href="http://siromni.com/signup/${user.username}">siromni.com/signup</a><p>
            `;

      let mailOptions = {
        from: '"no-reply" <siromni.com@gmail.com>',
        to: req.body.friend_email,
        subject: `${user.first_name} ${user.last_name} invited you to join siromni.com`,
        html: message + req.body.message
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          // flash message: Your email was not sent.
          console.log("Your email was not sent.");
          return res.redirect("back");
        }
        if (info) {
          console.log("message %s sent: %s", info.messageId, info.response);
        }
      });

      // to referrer
      let transporter2 = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: "siromni.com@gmail.com",
          pass: "pvkvlnqqyuhohrcc"
        }
      });

      let message2 = `<p>Hi ${user.first_name},</p>
            <p>You've successfully sent an invite to ${req.body.friend_name} to join SirOmni.</p>
            `;

      let mailOptions2 = {
        from: '"no-reply" <siromni.com@gmail.com>',
        to: req.body.your_email,
        subject: `SirOmni registration invite successfully sent`,
        html: message2
      };

      transporter2.sendMail(mailOptions2, (error, info) => {
        if (error) {
          console.log(error);
          // flash message: Your email was not sent.
          console.log("Your email was not sent.");
          return res.redirect("back");
        }
        if (info) {
          console.log("message %s sent: %s", info.messageId, info.response);
        }
        req.flash("success", "Registration invite successfully sent");
        res.redirect("back");
      });
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
    });
};
exports.inboxPage = (req, res) => {
  db("inbox")
      .innerJoin("users", "inbox.sender_id", "users.id")
      .orderBy("message_id", "desc") // Use message_id as the primary key
      .where("owner_id", req.user.id)
      .then((messages) => {
          console.log("messages", messages)
          res.render("inbox", { currentUser: req.user, messages })
      })
}
exports.sendMessage = (req, res) => {
  db("users")
    .where("username", req.body.username)
    .first()
    .then((user) => {
      if (user) {
        db("inbox")
          .insert({
            owner_id: req.user.id,
            sender_id: user.id,
            message: req.body.message,
            date: new Date().today(),
            time: new Date().timeNow()
          })
          .then(() => { res.redirect("back") })
      } else {
        req.flash("error", "Username doesn't exist")
        res.redirect("back");
      }
    })
}
exports.deleteMessage = (req, res) => {
  db("inbox")
    .where("message_id", req.params.message_id)
    .del()
    .then(() => { res.redirect("back") })
}
exports.deleteApp = (req, res) => {
  console.log(req.body.app_id);
  db("apps")
    .whereIn("id", req.body.app_id)
    .del()
    .then(() => { res.redirect("back") })
}

exports.browser = (req, res) => {
  res.render("browser", { currentUser: req.user });
}

exports.revealApp = (req, res) => {
  db("apps")
    .where("key", req.body.key)
    .first()
    .then((app) => {
      if (app) {
        db("users_apps")
          .where({
            app_id: app.id,
            user_id: req.user.id
          })
          .first()
          .then((match) => {
            if (match) {
              res.redirect("back")
            } else {
              db("users_apps")
                .insert({
                  app_id: app.id,
                  user_id: req.user.id
                })
                .then(() => {
                  res.redirect("back")
                })
            }
          })
      } else {
        res.redirect("back")
      }
    })
}

exports.payment = (req, res) => {
  db("manage_subscription")
    // .where("user_id", req.user.id)
    .select("*")
    .then((apps) => {
      console.log("apps frm payment", apps)
      res.render("payment", { currentUser: req.user, apps: apps });
    })
}

exports.redirectToStripe = (req, res) => {
  const { planId, planLink,duration } = req.body;
  // Store the planId in the session or a temporary storage to retrieve it later
  req.session.planId = planId;
  req.session.duration = duration;
  res.redirect(planLink);
};
exports.check_payment = async (req, res) => {
  const sessionId = req.query.session_id;
  const planId = req.session.planId; // Retrieve the planId from the session
  const duration = req.session.duration; // Retrieve the duration from the session
  try {
    // Retrieve the checkout session
    const session = await retrieveCheckoutSession(sessionId);

    if (session.subscription) {
      var user_id = req.user.id;
      console.log("sessionuser_id", user_id);
      // Retrieve the subscription details
      const subscription = await retrieveSubscription(session.subscription);

      // Calculate the subscription end date based on the duration
      const subscriptionEndDate = new Date();
      if (duration === 'monthly') {
        subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
      } else if (duration === 'yearly') {
        subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
      }
      console.log("subscriptionEndDate", subscriptionEndDate, duration);

      await db("users")
        .where("id", user_id)
        .update({
          plan_id: subscription.id,
          is_active: 1,
          is_suspended: 0, // Update the suspension status
          subscription_end_date: subscriptionEndDate
        });
      console.log("User subscription updated successfully"); // Log success message
      console.log("sub", subscription);
      res.locals.subscription = subscription; // Pass subscription details to the view
    } else {
      console.log('Payment successful, but no subscription was created.');
      res.locals.subscription = null; // Indicate no subscription was created
    }

    // Fetch the selected plan and its associated apps
    const selectedPlan = await db("manage_subscription").where("id", planId).first();
    console.log("Selected Plan for Payment:", selectedPlan.apps); // Log the selected plan
    let selectedApps = [];
    try {
      if (typeof selectedPlan.apps === 'string') {
        // Preprocess the JSON string to ensure it is in a valid format
        const validJsonString = selectedPlan.apps.replace(/'/g, '"');
        selectedApps = JSON.parse(validJsonString);
      } else if (Array.isArray(selectedPlan.apps)) {
        selectedApps = selectedPlan.apps;
      } else {
        throw new Error('Invalid format for apps');
      }
    } catch (jsonError) {
      console.error("Error parsing apps JSON:", jsonError.message);
      selectedApps = []; // Fallback to an empty array if parsing fails
    }
    console.log("Selected Apps for Payment:", selectedApps); // Log the selected apps

    // Delete existing apps for the user
    await db("users_apps")
      .where("user_id", req.user.id)
      .del();

    // Grant access to selected apps
    const appPromises = selectedApps.map(appId => {
      return db("users_apps").insert({
        app_id: appId,
        user_id: req.user.id
      });
    });

    await Promise.all(appPromises);
    console.log("Apps granted successfully"); // Log success message

    // Render the view with the data
    res.render("check_payment", { currentUser: req.user, apps: selectedApps, subscription: res.locals.subscription });

  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
exports.manage_subscription = (req, res) => {
  if (req.user.is_superAdmin) {
    db("manage_subscription")
      .where("user_id", req.user.id)
      .select("*")
      .then((apps) => {
        res.render("manage_subscription", { currentUser: req.user, apps: apps });
      })
  } else {
    db("manage_subscription")
      .where("user_id", req.user.id)
      .select("*")
      .then((apps) => {
        res.render("manage_subscription", { currentUser: req.user, apps: apps });
      })
  }
}
exports.edit_subscription = (req, res) => {
  const subscriptionId = req.params.id;

  // Retrieve the subscription details
  const subscriptionQuery = db("manage_subscription")
    .where("id", subscriptionId)
    .first();

  // Retrieve all available apps
  const appsQuery = db("apps").select("*");

  // Retrieve the apps associated with the subscription
  const subscriptionAppsQuery = db("manage_subscription")
    .where("id", subscriptionId)
    .select("apps")
    .first();

  Promise.all([subscriptionQuery, appsQuery, subscriptionAppsQuery])
    .then(([subscription, apps, subscriptionApps]) => {
      let selectedApps = [];
      try {
        console.log("Raw apps JSON:", subscriptionApps.apps); // Log the raw JSON string
        // Check if apps is already an array
        if (Array.isArray(subscriptionApps.apps)) {
          selectedApps = subscriptionApps.apps;
        } else {
          // Preprocess the JSON string to convert it into a valid JSON format
          const validJsonString = subscriptionApps.apps.replace(/'/g, '"');
          selectedApps = JSON.parse(validJsonString || "[]");
        }
      } catch (error) {
        console.error("Error parsing apps JSON:", error);
        selectedApps = []; // Fallback to an empty array if parsing fails
      }
      res.render("edit_subscription", {
        currentUser: req.user,
        subscription,
        apps,
        selectedApps
      });
    })
    .catch(error => {
      console.error("Error fetching subscription data:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.terms = (req, res) => {
  db("pages")
    .where("id", 1)
    .first()
    .then(introText => res.render("terms", { currentUser: req.user, introText }))
}

exports.privacy = (req, res) => {
  db("pages")
    .where("id", 2)
    .first()
    .then(introText => res.render("privacy", { currentUser: req.user, introText }))
}

exports.edit_content = (req, res) => {
  const query1 = db("pages").where("id", 1).first();
  const query2 = db("pages").where("id", 2).first();

  Promise.all([query1, query2])
    .then(([introText1, introText2]) => {
      res.render("updatetermandpolicy", {
        currentUser: req.user,
        introText1,
        introText2
      });
    })
    .catch(error => {
      res.status(500).send("Error fetching data");
    });
}


exports.add_subscription = (req, res) => {
  db("manage_subscription")
    .where("id", 1)
    .first()
    .then(introText => res.render("add_subscription", { currentUser: req.user, introText }))
}

exports.save_content = (req, res) => {

  db("pages")
    .where("id", 1)
    .update({
      content: req.body.terms
    })
    .then(() => {
      //res.redirect(`/updatetermandpolicy`);
    })

  db("pages")
    .where("id", 2)
    .update({
      content: req.body.policy
    })
    .then(() => {
      res.redirect(`/edit-content`);
    })


}
exports.update_subscription = (req, res) => {
  const selectedApps = req.body.apps || [];

  if (req.body.id == '') {
    db("manage_subscription")
      .insert({
        plan: req.body.planName,
        user_id: req.user.id,
        price: req.body.planPrice,
        duration: req.body.duration,
        key_point: req.body.description,
        planLink: req.body.planLink,
        apps: JSON.stringify(selectedApps), // Store selected apps as a JSON string
        updated_at: new Date().today() + " - " + new Date().timeNow()
      })
      .then(() => {
        // Grant access to selected apps
        res.redirect(`/manage-subscription`);

        // const appPromises = selectedApps.map(appId => {
        //   return db("users_apps").insert({
        //     app_id: appId,
        //     user_id: req.user.id
        //   });
        // });

        // Promise.all(appPromises)
        //   .then(() => {
        //     res.redirect(`/manage-subscription`);
        //   });
      });
  } else {
    db("manage_subscription")
      .where("id", req.body.id)
      .update({
        plan: req.body.planName,
        price: req.body.planPrice,
        duration: req.body.duration,
        key_point: req.body.description,
        planLink: req.body.planLink,
        apps: JSON.stringify(selectedApps), // Store selected apps as a JSON string
        updated_at: new Date().today() + " - " + new Date().timeNow()
      })
      .then(() => {
                    res.redirect(`/manage-subscription`);

        // Grant access to selected apps
      //   const appPromises = selectedApps.map(appId => {
      //     return db("users_apps").insert({
      //       app_id: appId,
      //       user_id: req.user.id
      //     });
      //   });

      //   Promise.all(appPromises)
      //     .then(() => {
      //       res.redirect(`/manage-subscription`);
      //     });
      });
  }
}

// For today's date;
Date.prototype.today = function () {
  return ((this.getDate() < 10) ? "" : "") + (this.getMonth() + 1) + "/" + ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
  let hour = this.getHours()
  if (hour > 12) {
    hour = hour - 12;
  }
  return ((hour < 10) ? "0" : "") + hour + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}
// For todays date;
Date.prototype.today = function () {
  return ((this.getDate() < 10) ? "" : "") + (this.getMonth() + 1) + "/" + ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
  let hour = this.getHours()
  if (hour > 12) {
    hour = hour - 12;
  }
  return ((hour < 10) ? "0" : "") + hour + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}
