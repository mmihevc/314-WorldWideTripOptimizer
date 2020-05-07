package com.tco.server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class DbHandler {

    private final static String DB_URL = "jdbc:mysql://127.0.0.1:56247/cs314";

    // shared user with read-only access
    private final static String DB_USER = "cs314-db";
    private final static String DB_PASSWORD = "eiK5liet1uej";

    // SQL SELECT query statement
    private final static String COLUMN = "id";
    private final static String QUERY = "SELECT DISTINCT "+ COLUMN +" FROM world ORDER BY "+ COLUMN +" ASC;";

    //needs methods to check for 314_env and travis environment
    //potential helper functions for get places, get columns, get rows, get size


    public static String[] getQuery(String query, String name) {
        try (
                Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                Statement statement = conn.createStatement();
                ResultSet results = statement.executeQuery(query)
        ){
            int count = 0;
            ArrayList<String> result = new ArrayList<>();
            while (results.next()) {
                System.out.printf(results.getString(name));
                result.add(count, results.getString(name));
            }

            String[] array = new String[result.size()];

            for (int i = 0; i < result.size(); i++) {
                array[i] = result.get(i);
            }

            return array;

        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return null;
    }

    public static void main(String[] args) {
        try (
                // connect to the database and query
                Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(QUERY)
        ) {
            // iterate through query results and print out the column values
            int count = 0;
            while (results.next()) {
                System.out.printf("%6d %s\n", ++count, results.getString(COLUMN));
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }


}
