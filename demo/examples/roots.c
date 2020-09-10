/** Solves ax² + bx + c = 0 */
#include <stdio.h>
#include <math.h>

static int coefficients[3];
/** Read quadratic coefficients from stdin */
void getInput() {
    char *vars[3] = { "a", "b", "c" };
    puts("Solving ax² + bx + c = 0");
    for (int i = 0; i < 3; i++) {
        printf("What value of %s? ", vars[i]);
        scanf("%d", &coefficients[i]);
    }
}

int main() {
    getInput();
    int a = coefficients[0];
    int b = coefficients[1];
    int c = coefficients[2];
    // x = [-b ± √(b² - 4ac)] / 2a
    int discriminant = b * b - 4 * a * c;
    double left = -b / (2.0 * a);
    if (discriminant > 0) {
        // two real roots
        double right = sqrt(discriminant) / (2 * a);
        printf("x = %f and x = %f\n", left - right, left + right);
    } else if (discriminant == 0) {
        // only one root
        printf("x = %f\n", left);
    } else {
        puts("no real roots");
    }
}
