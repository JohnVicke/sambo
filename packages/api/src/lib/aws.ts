import AWS from "aws-sdk";

type PresignedUrlMethods = "GET" | "PUT";

interface GetPresignedUrlParams {
  key: string;
  method: PresignedUrlMethods;
  bucket?: string;
  expires?: number;
}

const signedUrlOptions: { [key in PresignedUrlMethods]: string } = {
  GET: "getObject",
  PUT: "putObject",
};

let s3: AWS.S3 | undefined;

const getS3Instance = () => {
  if (s3) return s3;
  return new AWS.S3(); // TODO: add credentials
};

export const getPresignedUrl = ({ method, key, bucket = "samboappen", expires = 100 }: GetPresignedUrlParams) =>
  getS3Instance().getSignedUrlPromise(signedUrlOptions[method], {
    Bucket: bucket,
    Key: key,
    Expires: expires,
  });
