# Merge Gradle Configuration files

## How to install the package

`yarn add global merge-gradle-conf` or `npm install -g merge-gradle-conf`

## How to run the package

In order to run the command you have to specify at least 2 parameters, i.e.:
 `merge-gradle-conf --currentBranch=master --comparedToBranch=maintenance`
 
In case that you would like to run the command where working directory is not the current directory, it can 
be also provided via the parameter:
`merge-gradle-conf --currentBranch=master --comparedToBranch=maintenance --workDir=/the/location/of/the/project`

## How the package works

The purpose of this library is to handle conflicts of `gradle/dependencies.conf` file across different branches.
Merging happens with the next logic:
* It preserves all keys. If one of the branches has more key/value pairs than other, merge will keep all key/value pairs.
For example:
```
dependencyManagement {
  versions {
    pluginA = "0.0.1"
    pluginC = "0.0.2"
  }
}
```
and 
```
dependencyManagement {
  versions {
    pluginD = "0.0.4"
  }
}
```
The result of merge is:
```
dependencyManagement {
  versions {
    pluginA = "0.0.1"
    pluginC = "0.0.2"
    pluginD = "0.0.4"
  }
}
```
* Merge happens line by line and it's looking at a key as a subject of comparison. Value for this key is taken from 
the branch, which has higher ranking based on [SemVer](https://semver.org/) rules.
For example, if 2 files are provided, like 
```
dependencyManagement {
  versions {
    pluginA = "1.0.0"
    pluginB = "2.0.0"
  }
}
```
and 
```
dependencyManagement {
  versions {
    pluginB = "1.2.0"
    pluginA = "1.5.0"
  }
}
```
The order of properties doesn't matter, pluginA will be compared against pluginA, the result of merge is:
```
dependencyManagement {
  versions {
    pluginA = "1.5.0"
    pluginB = "2.0.0"
  }
}
```

As merge is finished, `gradle/dependencies.conf` is going to be overwritten with a merged content in 
provided working directory (by default this this a current folder). 

Committing and pushing of the final merge has to be performed by a user.  
