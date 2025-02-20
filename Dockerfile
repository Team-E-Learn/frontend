# Deno container
FROM denoland/deno

# Expose the port for the project
EXPOSE 3000

# Change the working directory
WORKDIR /app

# Move packages to install over  
ADD deno.json deno.lock package.json /app/

# Install packages
RUN deno install --allow-scripts=npm:@sveltejs/kit@1.30.4,npm:@sveltejs/kit@2.15.1

# Add the project files to the directory
ADD . /app

# Build project
RUN deno task build

# Run project
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./build/index.js"]

