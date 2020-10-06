#include <stdlib.h>
#include <stdio.h>

int main() {
	char *input = "32.6";
	float inputAsFloat = strtof(input, NULL);
	printf("result: %.1f\n", inputAsFloat + 5.9);
}
