#include <stdio.h>

int main() {
	int number;
	while (1) {
		printf("Enter a negative integer: ");
		scanf("%d", &number);
		if (number < 0) {
			break;
		} else {
			puts("Invalid input (must be less than 0)");
		}
	}
	printf("Okay, got %d\n", number);
}

