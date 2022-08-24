/**
 *
 * !important - this project currently does not have a backend so we are
 * !important   passing the initial state to the mobX stores from here (instead of doing an api fetch)
 *
 **/

export const INITIAL_ALL_BULLET_ENTRIES = {
  info: {
    count: 10,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    {
      id: "5b122234-4931-4037-8347-f662739ba01b",
      status: "todo",
      text: "Empty the robot hoover",
      dateCreated: 1660829903907,
    },
    {
      id: "0c623dc4-36a1-4485-a68d-a03cc223924d",
      status: "todo",
      text: "Empty the robot hoover",
      dateCreated: 1660830439548,
    },
    {
      id: "7b9a7d5a-357e-4c66-b8ff-96de3cc71bf6",
      status: "todo",
      text: "Do job search independent of recruiters",
      dateCreated: 1660830446732,
    },
    {
      id: "44d16208-db00-4db7-b242-386d0eeca115",
      status: "todo",
      text: "Build new CV",
      dateCreated: 1660830452579,
    },
    {
      id: "aad640ce-76de-4a3a-86dc-6cf45750fe0c",
      status: "todo",
      text: "Varnish table legs and buy mahogony vinyl stickers",
      dateCreated: 1660830459507,
    },
    {
      id: "011cda35-73ca-487c-9460-f4e7f6afd36c",
      status: "todo",
      text: "Finish tardis painting",
      dateCreated: 1660830467475,
    },
    {
      id: "5e9fe3f0-7135-40fe-addb-668f60b15cfc",
      status: "completed",
      text: "Wash dishes",
      dateCreated: 1660830472940,
    },
    {
      id: "36eb2f2b-a213-43c3-aee5-ef7035a91989",
      status: "note",
      text: "It finally rained and the air feels fresher today",
      dateCreated: 1660830480419,
    },
    {
      id: "5ac99dc5-ee8f-414c-ae40-afb9580cdb5b",
      status: "inspirationalIdeas",
      text: "The white TV back panel could be used for some ultra wide-screen artwork",
      dateCreated: 1660830485627,
    },
    {
      id: "f0c906d1-b152-472a-bb58-3aa9fd5f75f2",
      status: "deleted",
      text: "Clean outside of car",
      dateCreated: 1660830496108,
    },
  ],
}

export const INITIAL_ALL_DAYS = {
  info: {
    count: 10,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    {
      id: "5b122234-4931-4037-8347-f662739ba01b",
      date: "20220823",
      dailyEntries: [
        {
          entryId: "aad640ce-76de-4a3a-86dc-6cf45750fe0c",
          dayPriorityRanking: null,
          migrated: false,
        },
        {
          entryId: "5b122234-4931-4037-8347-f662739ba01b",
          dayPriorityRanking: null,
          migrated: false,
        },
        {
          entryId: "0c623dc4-36a1-4485-a68d-a03cc223924d",
          dayPriorityRanking: null,
          migrated: false,
        },
        {
          entryId: "36eb2f2b-a213-43c3-aee5-ef7035a91989",
          dayPriorityRanking: null,
          migrated: false,
        },
        {
          entryId: "5ac99dc5-ee8f-414c-ae40-afb9580cdb5b",
          dayPriorityRanking: null,
          migrated: false,
        },
        {
          entryId: "f0c906d1-b152-472a-bb58-3aa9fd5f75f2",
          dayPriorityRanking: null,
          migrated: false,
        },
      ],
    },
    {
      id: "aad640ce-76de-4a3a-86dc-6cf45750fe0c",
      date: "20220824",
      dailyEntries: [
        {
          entryId: "7b9a7d5a-357e-4c66-b8ff-96de3cc71bf6",
          dayPriorityRanking: null,
          migrated: false,
        },
      ],
    },
    {
      id: "5ac99dc5-ee8f-414c-ae40-afb9580cdb5b",
      date: "20220825",
      dailyEntries: [
        {
          entryId: "44d16208-db00-4db7-b242-386d0eeca115",
          dayPriorityRanking: null,
          migrated: false,
        },
      ],
    },
    {
      id: "011cda35-73ca-487c-9460-f4e7f6afd36c",
      date: "20220826",
      dailyEntries: [
        {
          entryId: "5e9fe3f0-7135-40fe-addb-668f60b15cfc",
          dayPriorityRanking: null,
          migrated: false,
        },
      ],
    },
  ],
}
