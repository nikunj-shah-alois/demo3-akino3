const magicJson = {
  type: "request",
  endpoint: "",
  executor: "",
  data: [],
  metadata: {
    company: {
      id: import.meta.env.VITE_VUE_APP_COMPANY_ID || import.meta.env.VITE_COMPANY_ID,
      name: "",
      licence: [
        {
          moduleName: "",
          isAccesible: true,
          permissions: [
            {
              subModuleName: "",
              create: true,
              read: true,
              update: true,
              delete: true,
            },
          ],
        },
      ],
    },
    user: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      licence: [
        {
          moduleName: "",
          isAccesible: true,
          permissions: [
            {
              subModuleName: "",
              create: true,
              read: true,
              update: true,
              delete: true,
            },
          ],
        },
      ],
    },
    data: {
      options: {
        sortBy: "",
        populate: "",
        limit: 100,
        page: 1,
        id: "",
      },
      filter: {},
    },
  },
};

export default magicJson;
