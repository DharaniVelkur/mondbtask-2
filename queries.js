db.users.insertMany([
  {
    user_id: 1,
    name: "user1",
    email: "user1@gmail.com",
    mentor_id: 1,
  },
  {
    user_id: 2,
    name: "user2",
    email: "user2@gmail.com",
    mentor_id: 1,
  },
  {
    user_id: 3,
    name: "user3",
    email: "user3@gmail.com",
    mentor_id: 1,
  },
  {
    user_id: 4,
    name: "user4",
    email: "user4@gmail.com",
    mentor_id: 2,
  },
  {
    user_id: 5,
    name: "user5",
    email: "user5@gmail.com",
    mentor_id: 2,
  },
]);
// inserting documents inside the codekata collection
db.codekata.insertMany([
  {
    user_id: 1,
    no_of_problems_solved: 10,
  },
  {
    user_id: 2,
    no_of_problems_solved: 20,
  },
  {
    user_id: 3,
    no_of_problems_solved: 30,
  },
  {
    user_id: 4,
    no_of_problems_solved: 40,
  },
  {
    user_id: 5,
    no_of_problems_solved: 50,
  },
]);

// inserting documents inside the attendance collection

db.attendance.insertMany([
  {
    user_id: 1,
    topic_id: 1,
    present: true,
  },
  {
    user_id: 2,
    topic_id: 2,
    present: true,
  },
  {
    user_id: 3,
    topic_id: 3,
    present: false,
  },
  {
    user_id: 4,
    topic_id: 4,
    present: false,
  },
  {
    user_id: 5,
    topic_id: 5,
    present: false,
  },
]);

// inserting documents inside the topics collection
db.topics.insertMany([
  {
    topic_id: 1,
    topic: "HTML",
    topic_date: new Date("2023-03-10"),
  },
  {
    topic_id: 2,
    topic: "CSS",
    topic_date: new Date("2023-10-12"),
  },
  {
    topic_id: 3,
    topic: "Javascript",
    topic_date: new Date("2023-10-30"),
  },
  {
    topic_id: 4,
    topic: "React",
    topic_date: new Date("2023-06-12"),
  },
  {
    topic_id: 5,
    topic: "NodeJs",
    topic_date: new Date("2021-10-30"),
  },
]);

// inserting documents inside the tasks collection
db.tasks.insertMany([
  {
    task_id: 1,
    topic_id: 1,
    user_id: 1,
    task: "HTML task",
    due_date: new Date("2023-05-15"),
    submitted: true,
  },
  {
    task_id: 2,
    topic_id: 2,
    user_id: 2,
    task: "CSS task",
    due_date: new Date("2023-05-16"),
    submitted: true,
  },
  {
    task_id: 3,
    topic_id: 3,
    user_id: 3,
    task: "Javascript task",
    due_date: new Date("2023-05-17"),
    submitted: false,
  },
  {
    task_id: 4,
    topic_id: 4,
    user_id: 4,
    task: "React task",
    due_date: new Date("2023-05-18"),
    submitted: false,
  },
  {
    task_id: 5,
    topic_id: 5,
    user_id: 5,
    task: "Node task",
    due_date: new Date("2023-05-19"),
    submitted: false,
  },
]);

// inserting documents inside the companydrives collection
db.company_drives.insertMany([
  {
    user_id: 1,
    drive_date: new Date("2023-07-05"),
    company_name: "Google",
  },
  {
    user_id: 1,
    drive_date: new Date("2023-07-05"),
    company_name: "Amazon",
  },
  {
    user_id: 2,
    drive_date: new Date("2023-07-05"),
    company_name: "Walmart",
  },
  {
    user_id: 3,
    drive_date: new Date("2023-07-05"),
    company_name: "Zoho",
  },
  {
    user_id: 4,
    drive_date: new Date("2023-07-05"),
    company_name: "Dell",
  },
]);

// inserting documents inside the mentors collection
db.mentors.insertMany([
  {
    mentor_id: 1,
    mentor_name: "mentor1",
    mentor_email: "mentor1@gmail.com",
  },
  {
    mentor_id: 2,
    mentor_name: "mentor2",
    mentor_email: "mentor2@gmail.com",
  },
  {
    mentor_id: 3,
    mentor_name: "mentor3",
    mentor_email: "mentor3@gmail.com",
  },
  {
    mentor_id: 4,
    mentor_name: "mentor4",
    mentor_email: "mentor4@gmail.com",
  },
  {
    mentor_id: 5,
    mentor_name: "mentor5",
    mentor_email: "mentor5@gmail.com",
  },
]);

//-----Find all the topics and tasks which are taught in the month of October------
db.topics.aggregate([
  {
    $match: {
      topic_date: { $gte: new Date("2023-10-01"), $lt: new Date("2023-11-01") },
    },
  },
  {
    $lookup: {
      from: "tasks",
      localField: "topic_id",
      foreignField: "task_id",
      as: "tasks",
    },
  },
]);


//-----Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020-----

db.company_drives.find(
    {
        drive_date:{
            $gte:new Date("2020-10-15"),
            $lte:new Date("2020-10-31")
        }
    }
)

//------Find all the company drives and students who are appeared for the placement.----
db.company_drives.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "user_id",
        as: "users",
      },
    },
  ]);


//--------Find the number of problems solved by the user in codekata
db.codekata.aggregate([
    {
        $lookup:{
            from:"users",
            localField:"user_id",
            foreignField:"user_id",
            as:"users"
        }
    },
    {
        $project:{
        no_of_problems_solved:1,
        username:"$users.0.name",
        user_id:1
        }
    }
])

//----Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020-----
db.users.aggregate([
    {
        $lookup:{
            from:"attendance",
            localField:"user_id",
            foreignField:"user_id",
            as:"attendance"
        },
        $lookup:{
            from:"task",
            localField:"user_id",
            foreignField:"task_id",
            as:"tasks"
        },
            $match:{
                $and :[
                    {"due_date":{$gte: new Date("2020-10-15"),$lt: new Date("2020-10-31")}}
                ]
            }
    }
])
