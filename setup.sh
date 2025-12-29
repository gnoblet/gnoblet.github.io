#!/usr/bin/env bash

# Setup script for gnoblet.github.io
# This script helps you get started with the SvelteKit + Bun project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check if Bun is installed
check_bun() {
    print_header "Checking Prerequisites"

    if command -v bun &> /dev/null; then
        BUN_VERSION=$(bun --version)
        print_success "Bun is installed (version $BUN_VERSION)"
        return 0
    else
        print_error "Bun is not installed"
        echo ""
        print_info "To install Bun, run one of the following commands:"
        echo ""
        echo "  macOS/Linux/WSL:"
        echo "    curl -fsSL https://bun.sh/install | bash"
        echo ""
        echo "  Windows (PowerShell):"
        echo "    powershell -c \"irm bun.sh/install.ps1 | iex\""
        echo ""
        print_info "Visit https://bun.sh for more information"
        exit 1
    fi
}

# Clean previous installations
clean_install() {
    print_header "Cleaning Previous Installation"

    if [ -d "node_modules" ]; then
        print_info "Removing node_modules..."
        rm -rf node_modules
        print_success "Removed node_modules"
    fi

    if [ -f "bun.lockb" ]; then
        print_info "Removing bun.lockb..."
        rm -f bun.lockb
        print_success "Removed bun.lockb"
    fi

    if [ -d ".svelte-kit" ]; then
        print_info "Removing .svelte-kit..."
        rm -rf .svelte-kit
        print_success "Removed .svelte-kit"
    fi

    if [ -d "build" ]; then
        print_info "Removing build directory..."
        rm -rf build
        print_success "Removed build directory"
    fi
}

# Install dependencies
install_dependencies() {
    print_header "Installing Dependencies"

    print_info "Running bun install..."
    if bun install; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Setup static directory
setup_static() {
    print_header "Setting Up Static Directory"

    if [ ! -d "static" ]; then
        mkdir -p static
        print_success "Created static directory"
    fi

    if [ ! -d "static/assets" ]; then
        mkdir -p static/assets
        print_success "Created static/assets directory"
    fi

    # Create .nojekyll file for GitHub Pages
    touch static/.nojekyll
    print_success "Created static/.nojekyll file"
}

# Create example environment file
create_env_example() {
    print_header "Setting Up Environment"

    if [ ! -f ".env.example" ]; then
        cat > .env.example << 'EOF'
# SvelteKit Environment Variables
# Copy this file to .env.local and update with your values

# Public variables (available in browser)
PUBLIC_SITE_URL=https://gnoblet.github.io

# Private variables (server-side only)
# Add any API keys or secrets here
EOF
        print_success "Created .env.example file"
    fi
}

# Run type checking
check_types() {
    print_header "Running Type Check"

    print_info "Running svelte-kit sync and svelte-check..."
    if bun run check; then
        print_success "Type check passed"
    else
        print_warning "Type check found some issues (you can fix these later)"
    fi
}

# Test build
test_build() {
    print_header "Testing Production Build"

    print_info "Running production build..."
    if bun run build; then
        print_success "Production build successful"

        if [ -d "build" ]; then
            BUILD_SIZE=$(du -sh build | cut -f1)
            print_info "Build size: $BUILD_SIZE"
        fi
    else
        print_error "Production build failed"
        exit 1
    fi
}

# Print next steps
print_next_steps() {
    print_header "Setup Complete! 🎉"

    echo -e "${GREEN}Your SvelteKit project is ready to go!${NC}\n"

    echo "Next steps:"
    echo ""
    echo "  1. Start the development server:"
    echo -e "     ${BLUE}bun dev${NC}"
    echo ""
    echo "  2. Open your browser to:"
    echo -e "     ${BLUE}http://localhost:5173${NC}"
    echo ""
    echo "  3. Customize your content:"
    echo "     - Update projects in src/routes/projects/+page.svelte"
    echo "     - Update about me in src/routes/aboutMe/+page.svelte"
    echo "     - Add your images to static/assets/"
    echo ""
    echo "  4. Build for production:"
    echo -e "     ${BLUE}bun run build${NC}"
    echo ""
    echo "  5. Preview production build:"
    echo -e "     ${BLUE}bun run preview${NC}"
    echo ""
    echo "Useful commands:"
    echo -e "  ${BLUE}bun run check${NC}       - Type check your code"
    echo -e "  ${BLUE}bun run lint${NC}        - Lint your code"
    echo ""
    echo "Documentation:"
    echo "  - Quick Start: QUICKSTART.md"
    echo "  - Migration Guide: MIGRATION_GUIDE.md"
    echo "  - Full README: README.md"
    echo ""
    print_success "Happy coding! 🚀"
}

# Main setup flow
main() {
    echo -e "${GREEN}"
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                                                          ║"
    echo "║         SvelteKit + Bun + Tailwind + DaisyUI            ║"
    echo "║              Setup Script v1.0                          ║"
    echo "║                                                          ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo -e "${NC}"

    # Run setup steps
    check_bun

    # Ask user if they want a clean install
    echo ""
    read -p "Do you want to perform a clean install? (removes node_modules, .svelte-kit, etc.) [y/N]: " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        clean_install
    fi

    install_dependencies
    setup_static
    create_env_example

    # Ask if user wants to run checks
    echo ""
    read -p "Do you want to run type checking? [Y/n]: " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        check_types
    fi

    # Ask if user wants to test build
    echo ""
    read -p "Do you want to test the production build? [Y/n]: " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        test_build
    fi

    print_next_steps
}

# Run main function
main
