function Parts(width, height){
    this.board = Math.round((width * height) / (70 * 5));
    this.connector = Math.round(this.board / 2);
    this.rope = Math.round(width / 50);
}

function Shutter(width, height, price, isFinished, isPaid){
    if(width === undefined ||
        typeof width !== 'number' || width < 0){
        throw "Error(shutter): Width is invalid!";
    }
    if(height === undefined ||
        typeof height !== 'number' || height < 0){
        throw "Error(shutter): Height is invalid!";
    }

    this.width = width;
    this.height = height;
    this.parts = new Parts(width, height);
    this.isFinished = false;

}

function ShutterFromJson(shutter)
{
    if(shutter === undefined){
        throw "Error(shutter): Shutter is undefined!";
    }

    return new Shutter(
        shutter.width,
        shutter.height
    );
}

module.exports = {
    "Parts": Parts,
    "Shutter": Shutter,
    "ShutterFromJson": ShutterFromJson
};