import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

function buildMongoUri() {
  const rawUri = process.env.MONGODB_URI?.trim();
  if (!rawUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  const dbName = process.env.MONGODB_DB_NAME?.trim() || "gps_dhamthal";

  if (rawUri.includes("?")) {
    return rawUri;
  }

  const base = rawUri.endsWith("/") ? rawUri.slice(0, -1) : rawUri;
  const hasDbPath = /mongodb(\+srv)?:\/\/[^/]+\/[^/?]+/.test(base);

  if (hasDbPath) {
    return `${base}?retryWrites=true&w=majority`;
  }

  return `${base}/${dbName}?retryWrites=true&w=majority`;
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = buildMongoUri();

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
