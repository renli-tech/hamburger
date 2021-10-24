export const { DATABASE_URl, APP_AUTH_SECRET, APP_SECRET } = process.env;

// JWT_AUTH
export const JWT_AUTH = {
  secret: APP_AUTH_SECRET,
  credentialsRequired: false,
  algorithms: ["HS256"],
};

export const PORT = process.env.PORT || 4000;

// GRAPHQL PATH
export const GRAPHQL_PATH = "/graphql";

// RESOLVER PATHS
export const RESOLVER_PATHS = "/resolvers/**/*Resolver.{js,ts}";
