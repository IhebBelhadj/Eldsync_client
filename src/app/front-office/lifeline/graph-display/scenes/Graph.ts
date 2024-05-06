import { Scene } from 'phaser';

export class GraphScene extends Scene {
    private line: Phaser.GameObjects.Line;
    private centerY: number;

    constructor() {
        super('Graph');
    }

    create() {
        this.centerY = this.cameras.main.height / 2;

        // Create a horizontal line from the center of the left edge to the center of the right edge
        this.line = this.add.line(0, this.centerY, 0, 0, this.cameras.main.width, this.centerY, 0xffffff);
        this.line.setLineWidth(2);

        // Set camera bounds
        this.cameras.main.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);

        // Enable camera drag only along the x-axis
        let cameraDragging = false;
        let cameraDragStartX = 0;

        this.input.on('pointerdown', (pointer) => {
            if (pointer.y >= 0 && pointer.y <= this.cameras.main.height) {
                cameraDragging = true;
                cameraDragStartX = pointer.x;
            }
        });

        this.input.on('pointermove', (pointer) => {
            if (cameraDragging) {
                const dragDeltaX = cameraDragStartX - pointer.x;
                this.cameras.main.scrollX += dragDeltaX;
                cameraDragStartX = pointer.x;

                // Update the line position to always start from the center of the left edge
                this.updateLine();
            }
        });

        this.input.on('pointerup', () => {
            cameraDragging = false;
        });

        // Create randomly generated circles along the line
        const circleCount = 10;
        const lineStartX = this.cameras.main.scrollX;
        const lineEndX = this.cameras.main.scrollX + this.cameras.main.width;
        for (let i = 0; i < circleCount; i++) {
            const randomX = Phaser.Math.Between(lineStartX, lineEndX);
            const randomY = this.centerY;
            this.add.circle(randomX, randomY, 5, 0xff0000);
        }
    }

    override update() {
        // Call updateLine() in the update method to ensure the line position is recalculated continuously
        this.updateLine();
    }

    private updateLine() {
        // Calculate the new line position to start from the center of the left edge
        const lineStartX = this.cameras.main.scrollX;
        const lineEndX = this.cameras.main.scrollX + this.cameras.main.width;

        // Update the line
        this.line.setTo(lineStartX, this.centerY, lineEndX, this.centerY);
    }
}
