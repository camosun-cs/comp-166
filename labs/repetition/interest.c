#include <stdio.h>
#include <math.h>

#define COMPOUND_PER_YEAR 12
#define INTEREST_RATE 0.025
#define DISPLAY_YEARS 5
#define CENTS 100

int main() {
    double realRate;
    long balance[DISPLAY_YEARS + 1];

    printf("Annual interest rate: %.2f%%\n", INTEREST_RATE * 100);
    printf("Interest compounded %d times yearly\n", COMPOUND_PER_YEAR);
    printf("Initial Investment: $");
    scanf("%ld", balance);
    balance[0] *= CENTS;

    realRate = 1 + INTEREST_RATE / COMPOUND_PER_YEAR;
    for (int year = 1; year <= DISPLAY_YEARS; year++) {
        balance[year] = balance[year - 1];
        for (int period = 0; period < COMPOUND_PER_YEAR; period++) {
            balance[year] = lround(balance[year] * realRate);
        }
    }

    for (int year = 1; year <= DISPLAY_YEARS; year++) {
        printf(
            "year %d:  $%ld.%0.2ld\n",
            year,
            balance[year] / CENTS,
            balance[year] % CENTS
        );
    }
}
