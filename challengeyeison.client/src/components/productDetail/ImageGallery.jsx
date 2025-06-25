export default function ImageGallery({ images }) {
    return (
        <div className="bg-gray-100 p-4">
            {images && images.length > 0 ? (
                <img
                    //src={images[0]}
                    src="https://cdn.pixabay.com/photo/2024/06/28/14/22/jesus-8859597_1280.jpg"
                    alt="Imagen del producto"
                    className="w-full rounded border"
                />
            ) : (
                <p className="text-gray-600">No hay imágenes disponibles</p>
            )}
            {console.log("Images:", images)}
            <p className="text-red-600 font-bold">Componente cargado</p>
        </div>
    );
}
