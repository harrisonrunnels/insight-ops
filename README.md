# Insight Ops

Use os.environ["HACKATHON_API_KEY"] = "YOUR_API_KEY" in order to key the OpenAI environment key.

Download the data here: https://vl-nat-sec-hackathon-may-2024.s3.us-east-2.amazonaws.com/russia_social_media.csv
Insert the data into the main folder as the reference is "./russia_social_media.csv"

### Frontend

Uses the React Flow library to render the graph. https://reactflow.dev/learn

Graph is represented as json in `graph-explorer/src/graph.json`

`cd graph-explorer`
`npm install`
`npm run dev`