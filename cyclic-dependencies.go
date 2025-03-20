package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"

	"github.com/mattn/go-zglob"
	"gopkg.in/yaml.v3"
)

func main() {
	workspaces := findWorkspacePackages()	
	fmt.Println("Hello, World!", workspaces)
}

func readWorkspacesPackageJson() []string {
	file, err := os.ReadFile("./package.json")
	if err != nil {
		panic("Missing package.json in working directory")
	}
	type Package struct {
		Name string
		Workspaces []string
	}
	var p Package
	err1 := json.Unmarshal(file, &p)
	if err1 != nil {
		panic("Error parsing package.json")
	}
	fmt.Println("package: ", p)

	return p.Workspaces
}

func readWorkspacesPnpm() []string {
	fmt.Println("Reading pnpm-workspace.yaml")
	file, err := os.ReadFile("./pnpm-workspace.yaml")
	if err != nil {
		panic("Missing pnpm-workspace.yaml in working directory")
	}
	type PnpmWorkspaces struct {
		Packages []string
	}

	var p PnpmWorkspaces
	err1 := yaml.Unmarshal(file, &p)
	if err1 != nil {
		panic("Error parsing pnpm-workspace.yaml")
	}
	fmt.Println("pnpm-workspaces: ", p)

	return p.Packages
}

func findWorkspacePackages() []string {
	var workspaces []string
	if _, err := os.Stat("./pnpm-workspace.yaml"); errors.Is(err, os.ErrNotExist) {
		// ./pnpm-workspaces.yml does not exist
		workspaces = readWorkspacesPackageJson()
	} else {
		workspaces = readWorkspacesPnpm()
	}

	var result []string

	for _, glob := range workspaces {
		matches, errMatches := zglob.Glob(glob + "/package.json")
		if errMatches != nil {
			fmt.Println("Error: ", errMatches)
		}
		fmt.Println("workspace: ", matches)
		result = append(result, matches...)
	}

	return result
}

