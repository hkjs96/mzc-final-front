import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { v4 as uuidv4 } from 'uuid';

const sqs = new SQSClient({ region: "ap-northeast-2" });

export const handler = async (event) => {

    try {

        const requestBody = JSON.parse(event.body);
        const randomUUID = uuidv4();
        requestBody.orderNo = randomUUID;
        const orderObj = requestBody;

        console.log("------------------------------------------");
        console.log("event: ", event);
        console.log("------------------------------------------");
        console.log("requestBody: ", requestBody);
        console.log("------------------------------------------");

        const message = JSON.stringify(orderObj);

        // Prepare the message parameters
        const params = {
            MessageBody: message,
            QueueUrl:
                "https://sqs.ap-northeast-2.amazonaws.com/847369511738/OrderQueue",
        };

        // Send the message to the SQS queue
        const result = await sqs.send(new SendMessageCommand(params));
        console.info("Message sent to SQS - Message sent:", result.MessageId);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST"
            },
            body: message,
        };
    } catch (error) {
        console.error("Error sending message:", error);
        return {
            statusCode: 500,
            body: "Error sending message to SQS",
        };
    }


};
