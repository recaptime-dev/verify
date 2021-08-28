FROM gitpod/workspace-full

# Install ESLint and Prettier ahead of time, also don't forget Danger JS
RUN npm i -g eslint prettier danger