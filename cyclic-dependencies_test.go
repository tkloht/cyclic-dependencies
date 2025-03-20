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

type testCase struct {
	fixtureName string
	expectedMatches []string
}

var testCases = []testCase{
	{"default", []string{"example1/package.json", "example2/package.json"}},
	{"star", []string{"packages/example1/package.json", "packages/example2/package.json"}},
	{"pnpm-doublestar", []string{"packages/backend/one/package.json", "packages/backend/two/package.json", "packages/frontend/one/package.json", "packages/frontend/two/package.json"}},
}



func TestCyclicDependencies(t *testing.T) {

	for _, tc := range testCases {
		initFixture(tc.fixtureName)
		result := findWorkspacePackages()
		os.Chdir("../..")// reset to the root directory
		slices.Sort(result)
		slices.Sort(tc.expectedMatches)
		if !slices.Equal(result, tc.expectedMatches) {
			t.Errorf("Expected %v, got %v",tc.expectedMatches, result)
		}
	}

	// initFixture("default")
	// result := findWorkspacePackages()
	// expected := []string{"example1/package.json", "example2/package.json"}
	// if !slices.Equal(result, expected) {
	// 	t.Errorf("Expected %v, got %v",expected, result)
	// }
}

