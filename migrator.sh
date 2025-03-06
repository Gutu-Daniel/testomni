#!/bin/bash

echo "> Migrating.."

# Loop files in migration/* and import each into database.
for db in `ls migration | sort -V`
do
    echo "Database: $db"

    for file in `ls migration/$db/*.sql | sort -V`
    do
        mysql -u root -p $db < $file
    done
done

echo

echo "> Seeding.."

# Loop files in seed/* and import each into database.
for db in `ls seed | sort -V`
do
    echo "Database: $db"

    for file in `ls seed/$db/*.sql | sort -V`
    do
        mysql -u root -p =$db < $file
    done
done

echo "Done"
