// Import the necessary modules
import { NestFactory } from '@nestjs/core' // NestJS framework
import { AppModule } from './app.module' // Main application module
import { ValidationPipe } from '@nestjs/common' // Validation module

// Define an asynchronous function to bootstrap the application
async function bootstrap() {
  // Create a new NestJS application instance
  const app = await NestFactory.create(AppModule)

  // Use the global validation pipe to automatically validate incoming requests
  app.useGlobalPipes(new ValidationPipe())

  // Start listening on port 3000
  await app.listen(3000)

  // Log the URL where the application is running
  console.log(`Application is running on: ${await app.getUrl()}`)
}

// Call the bootstrap function to start the application
bootstrap()
