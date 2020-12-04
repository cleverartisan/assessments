# Node.js Project Requirements

## Technology Stack
- Node.js
- TypeScript
- Express

## Functionality and Design
The application must expose restful endpoints that will parse data (passed in the request body) and return the value back to the client. The API will have two versions and depending on the version endpoint, the parsing of the data will return a different value back to the client. Use TypeScript interfaces so the code assumes the design / object properties.

## Deliverables
Submit your code via your personal github repository, and turn in the link for review.  

## API Specifications

Request Body
```json
{
  "data": "JOHN0000MICHAEL0009994567"
}
```

| Method | Path |
| :--- | ---: |
| POST | /api/v1/parse | 

Expected Response
```json
{
  "statusCode": 200,
  "data": {
    "firstName": "JOHN0000",
    "lastName": "MICHAEL000",
    "clientId": "9994567"    
  }
}
```

| Method | Path |
| :--- | ---: |
| POST | /api/v2/parse |

Expected Response
```json
{
  "statusCode": 200,
  "data": {
    "firstName": "JOHN",
    "lastName": "MICHAEL",
    "clientId": "999-4567"    
  }
}
```

### Building the code
This solution uses [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) to execute the package.scripts segment. This is only mentioned as yarn was explicity defined in the package.js file to combine build steps.

To build the code execute:
```
$> yarn build
```

To test the interface execute:
```
%> yarn start
```
This will result in a local server exposed at `http://localhost:4433`

To review unit test and code coverage execute:
```
%> yarn coverage
```
