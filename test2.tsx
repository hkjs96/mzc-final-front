import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const region = "ap-northeast-2";
const dynamodb = new DynamoDBClient({ region: region });
const sqs = new SQSClient({ region: region });

export const handler = async (event) => {
  try {
    // Prepare the receive message parameters
    const receiveParams = {
      QueueUrl:
        "https://sqs.ap-northeast-2.amazonaws.com/847369511738/OrderQueue",
      MaxNumberOfMessages: 1, // default : 1,  Maximum number of messages to retrieve in a single API call
      WaitTimeSeconds: 20, // Long polling to wait for messages (0-20 seconds)
    };

    const receiveCommand = new ReceiveMessageCommand(receiveParams);
    const receiveResult = await sqs.send(receiveCommand);

    const messages = receiveResult.Messages || [];

    for (const message of messages) {
      console.info(`message : ${message}`);
      const orderData = JSON.parse(message.Body);
      console.info(orderData);

      // Store the order data in DynamoDB
      await saveOrderData(orderData);

      // Delete the processed message from the queue
      const deleteParams = {
        QueueUrl: receiveParams.QueueUrl,
        ReceiptHandle: message.ReceiptHandle,
      };
      const deleteCommand = new DeleteMessageCommand(deleteParams);
      await sqs.send(deleteCommand);
    }

    return {
      statusCode: 200,
      body: "Order information message processed and stored in DynamoDB",
    };
  } catch (error) {
    console.error("Error processing order information message:", error);
    return {
      statusCode: 500,
      body: "Error processing order information message",
    };
  }
};

async function saveOrderData(orderData) {
  const params = {
    TableName: "test-order-history",
    Item: {
      // orderId: { S: orderData.orderId },
      orderNo: { S: orderData.orderNo },
      customerName : { S: orderData.customerName },
      // Add other attributes as needed
      productName : { S: orderData.name },
      originalPrice : { N: orderData.originalPrice },
      discountedPrice : { N: orderData.discountedPrice },
    },
  };

  const command = new PutItemCommand(params);
  await dynamodb.send(command);
}

