FROM denoland/deno
EXPOSE 3000
WORKDIR /app
ADD . /app
RUN deno install --allow-scripts=npm:@sveltejs/kit@1.30.4,npm:@sveltejs/kit@2.15.1
RUN deno task build
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./build/index.js"]
