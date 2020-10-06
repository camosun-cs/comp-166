#include <stdlib.h>
#include <time.h>
#include <stdio.h>

// random() returns a value from 0 up to (2^31)-1
#define RMAX 2147483647

int main() {
	srandom(time(NULL));
	int answer = random() / (RMAX / 99);
	printf("random number [0-99]: %d\n", answer);
}
