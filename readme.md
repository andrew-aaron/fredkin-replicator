 ---------------------------------------------------------\n
| ■     ■        ■  ■  ■     ■     ■  ■  ■        ■     ■ |\n
|    ■  ■           ■  ■  ■  ■  ■  ■  ■           ■  ■    |\n
| ■  ■     ■              ■     ■              ■     ■  ■ |\n
|       ■                 ■     ■                 ■       |\n
|             ■  ■     ■  ■  ■  ■  ■     ■  ■             |\n
| ■           ■  ■     ■     ■     ■     ■  ■           ■ |\n
| ■  ■              ■        ■        ■              ■  ■ |\n
| ■  ■        ■  ■     ■     ■     ■     ■  ■        ■  ■ |\n
|    ■  ■  ■  ■           ■  ■  ■           ■  ■  ■  ■    |\n
| ■  ■        ■  ■  ■  ■  ■     ■  ■  ■  ■  ■        ■  ■ |\n
|    ■  ■  ■  ■           ■  ■  ■           ■  ■  ■  ■    |
| ■  ■        ■  ■     ■     ■     ■     ■  ■        ■  ■ |
| ■  ■              ■        ■        ■              ■  ■ |
| ■           ■  ■     ■     ■     ■     ■  ■           ■ |
|             ■  ■     ■  ■  ■  ■  ■     ■  ■             |
|       ■                 ■     ■                 ■       |
| ■  ■     ■              ■     ■              ■     ■  ■ |
|    ■  ■           ■  ■  ■  ■  ■  ■  ■           ■  ■    |
| ■     ■        ■  ■  ■     ■     ■  ■  ■        ■     ■ |
 ---------------------------------------------------------

============================================================
Fredkin's Replicator
============================================================

Fredkin's Replicator is a form of cellular automata. There are two states, 'on' and 'off', for every cell. The algorithm starts by switching the centre-most cell on:

 ---------------
|               |
|               |
|       ■       |
|               |
|               |
 ---------------

In this example the sidelength (called 'dim' in the program) is 5. (The cells in the output have some padding so it looks more square). The algorithm then sums the neighbouring cells of each cell. If the sum of a cell is odd, it is set to 'on'. If even, it is set to 'off':

 ---------------
|               |
|    ■  ■  ■    |
|    ■     ■    |
|    ■  ■  ■    |
|               |
 ---------------

The centre cell had no 'on' neighbours, so its sum was zero and was subsequently set to 'off'. Meanwhile, the surrounding cells had one neighbour, the centre. The next couple frames looks like this:

 ---------------	 ---------------
| ■     ■     ■ |	| ■     ■     ■ |
|               |	|    ■  ■  ■    |
| ■           ■ |	| ■  ■     ■  ■ |
|               |	|    ■  ■  ■    |
| ■     ■     ■ |	| ■     ■     ■ |
 ---------------	 ---------------

Finally, the last frame transforms into:

 ---------------
|               |
|    ■  ■  ■    |
|    ■     ■    |
|    ■  ■  ■    |
|               |
 ---------------

Which as you might've noticed, is the same as frame 2. This is one of the reasons it's called a 'replicator', because this algorithm / pattern has recursion. In my implementation, there is a 'history' array which by default keeps the first 32 frames in memory. When the pattern recurs, and if it's stored in memory, the program will stop. Otherwise it will run forever (in which case, use Ctrl + C to break out of it).

============================================================
References
============================================================

"Terrific Toothpick Patterns"
Numberphile video which inspired this program featuring Neil Sloane:
https://youtu.be/_UtCli1SgjI

"On the Number of ON Cells in Cellular Automata" by Neil Sloane:
http://neilsloane.com/doc/Fredkin.pdf

Information in "Online Encyclopedia of Integer Sequences":
https://oeis.org/A160239
