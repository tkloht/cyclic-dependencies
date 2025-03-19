package main

import (
	"fmt"
	"os"
	"path"
	"slices"
	"testing"
)

func initFixture(name string) {
	fixtureDir := path.Join( ".", "fixtures", name)
  err1 := os.Chdir(fixtureDir)
	if err1 != nil {
		fmt.Println("Error: ", err1)
	}
	wd, error := os.Getwd()
	if error == nil {
		fmt.Println("Changed to: ", wd)
	} else {
		fmt.Println("Error: ", error)

	}

}

func TestCyclicDependencies(t *testing.T) {
	initFixture("default")
	result := findWorkspacePackages()
	expected := []string{"example1/package.json", "example2/package.json"}
	if !slices.Equal(result, expected) {
		t.Errorf("Expected %v, got %v",expected, result)
	}
}

