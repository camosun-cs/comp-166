/*
    A program to calculate equivalent coins for a given amount of
    money, using the largest possible denominations.
*/

#include <stdio.h>

// Change denominations
#define LOONIE 100
#define QUARTER 25
#define DIME 10

int main() {
    int remainder;
    int loonies;
    int quarters;
    int dimes;

    printf("Amount in cents to exchange: ");
    scanf("%d", &remainder);
    
    loonies = remainder / LOONIE;
    remainder %= LOONIE;
    quarters = remainder / QUARTER;
    remainder %= QUARTER;
    dimes = remainder / DIME;
    remainder %= DIME;

    printf(
        "Your change is:\n"
        "\u2022 %d loonies\n"
        "\u2022 %d quarters\n"
        "\u2022 %d dimes\n"
        "\u2022 %d pennies\n",
        loonies,
        quarters,
        dimes,
        remainder
    );
}
