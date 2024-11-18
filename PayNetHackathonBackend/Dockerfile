# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install app dependencies inside the container
RUN npm install

# Step 5: Copy the rest of your application code into the container
COPY . .

# Step 6: Expose the port your application will run on
EXPOSE 3000

# Step 7: Define the command to run your app
CMD ["npm", "start"]
