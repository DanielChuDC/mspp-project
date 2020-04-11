# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app
# RUN mkdir tmp

WORKDIR /tmp
## temp solution
## move the terraform template to ~ directory for testing purpose

COPY script/terraform.tf /tmp/terraform.tf
COPY script/terraform.tfvars /tmp/terraform.tfvars
COPY script/variable.tf /tmp/variable.tf
COPY script/output.tf /tmp/output.tf


WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

## Prepare for terraform
COPY terraform-binary/terraform-0.11.13 /usr/local/bin/terraform
COPY terraform-binary/terraform-provider-ibm_v0.17.1 /usr/local/bin/terraform-provider-ibm
RUN touch ~/.terraformrc
RUN echo 'providers {ibm = "/usr/local/bin/terraform-provider-ibm"}'>> ~/.terraformrc




RUN npm install

# Bundle app source code
COPY --chown=node . .

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node","." ]
