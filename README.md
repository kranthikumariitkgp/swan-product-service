# Skeleton project for Swagger
# README of SWAN Microservices #

This is Repo of swan microservices

## Software's used
    •  NodeJs
	•  ExpressJs
	•  Mongodb

### Mongo setup
mongo setup can be found at file mongo.txt

### How do I get set up code? ###

```
npm install
```
### Start the service
```
npm start
```

This contains 3 micro services.

1. MicroService-1 (API Gateway):
For JWT based authentication & authorisation, I have implemented jwt.js at root level of this project.

### steps
payload for generation token - {email:'kranthi@xyz.com', role: 'client'} 
Note: change role based on requirements.

Assumed secret key as 'secretKey'

### Methods
generateToken - It is used to generate token based on payload and secret key
decodeToken - It is used to decode token based on token and secret key


2. MicroService-2 (Users)
use to create an user in the users db with client access. It has 1 API.

API: http://localhost:3000/users/register
Method: POST
Payload: {
	"name": "ssd",
	"email":"scs@abc.com",
	"password": "dfdf",
	"gender": "M",
	"phonenumber": 1345,
	"role": "client" 
}
Headers: Authorization, Accept & Content-Type

Response: 
Success creation - {
    "message": "Succesfully stored to database."
}
Error Creation - {
    "message": "Error in storing to database"
}

3. MicroService-3 (Products)
This service is being used to create products, reviews & search products. It has 3 APIs.

API-1: http://localhost:3000/products
Method: POST
Payload: {
	"name": "kranthi",
	"barcode": 1234,
	"brand": "xyz",
	"description": "sample description",
	"price": 123,
	"available": true
}
Headers: Authorization & Accept

Response: 
Success creation - {
    "message": "Succesfully stored to database."
}
Error Creation - {
    "message": "Error in storing to database"
}

API-2: http://localhost:3000/products/review
Method: POST
Payload: {
	"barcode": 1234,
	"review": "bad",
	"name": "kranti"
}
Headers: Authorization & Accept

Response: 
Success creation - {
    "message": "Succesfully stored to database."
}
Error Creation - {
    "message": "Error in storing to database"
}

API-3: http://localhost:3000/products/search
Method: POST
Payload: {
	"searchText": "xyz"
}
Headers: Authorization & Accept

Response: 
Success creation - {
    "totalCount": 2,
    "products": [
        {
            "available": true,
            "barcode": 123,
            "brand": "xyz",
            "description": "sample description",
            "id": "5fde556170cc05243fb8fe13",
            "name": "kranthi",
            "price": 123,
            "reviews": []
        },
        {
            "available": true,
            "barcode": 1234,
            "brand": "xyz",
            "description": "sample description",
            "id": "5fde6b61c733ef2b67c297d6",
            "name": "kranthi",
            "price": 123,
            "reviews": [
                {
                    "_id": "5fdee45f80378036ec2e99c2",
                    "barcode": 1234,
                    "review": "bad-3",
                    "name": "kranti",
                    "createdAt": "2020-12-20A11:12:55.55GMT+0530",
                    "__v": 0
                },
                {
                    "_id": "5fdee45c80378036ec2e99c1",
                    "barcode": 1234,
                    "review": "bad-2",
                    "name": "kranti",
                    "createdAt": "2020-12-20A11:12:52.52GMT+0530",
                    "__v": 0
                }
            ]
        }
    ]
}
Error Creation - {
    "message": "Error in storing to database"
}

