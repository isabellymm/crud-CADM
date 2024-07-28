import { initializeDatabase } from "@/database/initializeDataBase"
import { Slot } from "expo-router"
import { SQLiteProvider } from "expo-sqlite"

export default function Layout() {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <Slot />
    </SQLiteProvider>
  )
}