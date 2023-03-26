#! /bin/bash
mongoimport --host mongodb --db test --collection users --type json --file /mongo-seed/users.json --jsonArray
mongoimport --host mongodb --db test --collection reviews --type json --file /mongo-seed/reviews.json --jsonArray