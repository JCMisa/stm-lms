/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://stmlms_owner:Chs6mwBTP0oE@ep-shiny-violet-a5tk0rgl.us-east-2.aws.neon.tech/stmlms?sslmode=require",
    },
};