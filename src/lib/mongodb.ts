import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;

// 개발 모드의 HMR에서 연결이 계속 늘어나지 않도록 전역에 보관한다
const globalForMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> };

export function getMongoClient(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // 연결 실패를 캐시하지 않고 다음 요청에서 다시 시도한다
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export const dbName = process.env.MONGODB_DB ?? "linknamu";
