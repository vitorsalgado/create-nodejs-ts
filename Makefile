SHELL := /bin/bash

.DEFAULT_GOAL := help
.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Run a development environment with Docker Compose.
	@docker-compose -f ./deployments/dev/docker-compose.yml up

down: ## Stop Docker Compose development environment.
	@docker-compose -f ./deployments/dev/docker-compose.yml down

clean: ## Clean Docker Compose development environment.
	@docker-compose -f ./deployments/dev/docker-compose.yml down --remove-orphans --volumes

.PHONY: test
test:
	@npm test

fmt: # Format code
	@npm run format

lint: # Run static analysis
	@npm run lint

check: # Run all checks for this project
	@npm run format:check
	@npm run lint
	@npm run test
	@npm run build

nvm: ## Install Node.js version described on .nvmrc
	[ -s "$$HOME/.nvm/nvm.sh" ] && . "$$HOME/.nvm/nvm.sh" && \
	nvm install $$(cat .nvmrc) && \
	nvm use
