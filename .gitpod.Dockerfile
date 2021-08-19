FROM gitpod/workspace-full

# Install Python stuff globally in user-wide
RUN pip3 install -U mkdocs mkdocs-material