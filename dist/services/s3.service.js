"use strict";
// import { Injectable } from '@nestjs/common';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import { ConfigService } from '@nestjs/config';
// @Injectable()
// export class S3Service {
//   private s3Client: S3Client;
//   constructor(private config: ConfigService) {
//     this.s3Client = new S3Client({
//         region: this.config.getOrThrow('AWS_S3_BUCKET_REGION'),
//         credentials: {
//           accessKeyId: this.config.getOrThrow('AWS_ACCESS_KEY_ID'),
//           secretAccessKey: this.config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
//         },
//       });
//   }
//   async getSignedUrl(
//     contentType: string,
//     fileName: string,
//     expiresIn = 15 * 60,
//   ) {
//     const command = new PutObjectCommand({
//       Bucket: this.config.get('AWS_S3_BUCKET_NAME'),
//       Key: fileName,
//       ContentType: contentType,
//     });
//     const signedUrl = await getSignedUrl(this.s3Client, command, {
//       expiresIn,
//     });
//     return {
//       signedUrl,
//       publicUrl: `https://${this.config.get(
//         'AWS_S3_BUCKET_NAME',
//       )}.s3.${this.config.get(
//         'AWS_S3_BUCKET_REGION',
//       )}.amazonaws.com/${fileName}`,
//     };
//   }
// }
