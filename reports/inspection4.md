# Inspection - Team *T11* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *NearestNeighbor.java, twoPointOptimization.java, threePointOptimization.java--all lines from each file* |
| Meeting | *date, time, location* |
| Checklist | *reference, URL, style, "breaks", error reporting, bugs, messy code, code "health", code smells, naming, code cleanliness, duplicate code, complexity* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Kai Griem | 30 min |
| Maddie Mihevc | 30 min. |
| Jackie Clotfelter | 30min |
| Kevin Schroeder | 20m |
| Kellyn Dassler | 30 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| nearestNeighbor:47 | no test for error processing tour results | low  | Kai Griem | |
| nearestNeighbor:21 | no test for places where length < 3 | low | Kai Griem | |
| threePointOptimization:38 | no test for multiple cases in check2opt | low | Kai Griem | |
| twopointoptimixation.java, line 25 | manual array copy | low | Jackie | |
| threePointOptimization.java.58 | if statement can be simplified | low | Maddie | |
| threePointOptimization.java.10 | mannual array copy | low | Maddie | |
| threePointOptimization.java.10 | mannual array copy | low | Maddie | |
| threePointOptimization.java, line 10 | If statement can be simplified | low | Jackie | |
| threePointOptimization.java.96-109 | duplicate code | low | Maddie | |
| threePointOptimization.java.64 | nothing to check if there's enough places to 3-opt | med | Kevin | |
| threePointOptimization.java.7 | swapping mechanism could be more in-place | low | Kevin | |
| NearestNeighbor.java.60 | could return a thread pool w/ zero threads if there is only 1 processor on the system | med | Kevin | |
| threePointOptimization.java.96-109 | duplicate code in these two functions can be reduced | low | Kellyn | |
| twoPointOptimization.java.21-26 | useroute function has duplicate for loops | low | Kellyn | |
| twoPointOptimization.java.1-58 | no test coverage | med | Kellyn | |
| threePointOptimization.java.1-110 | no test coverage | med | Kellyn | |
