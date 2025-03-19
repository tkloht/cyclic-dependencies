package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/mattn/go-zglob"
)

func main() {
	workspaces := findWorkspacePackages()	
	fmt.Println("Hello, World!", workspaces)
}


func findWorkspacePackages() []string {
	
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

	var result []string

	for _, glob := range p.Workspaces {
		matches, errMatches := zglob.Glob(glob)
		if errMatches != nil {
			fmt.Println("Error: ", errMatches)
		}
		fmt.Println("workspace: ", matches)
		result = append(result, matches...)
	}

	for i, dir := range result {
		result[i] = dir + "/package.json"
	}

	return result
}

