import { Button } from './ui/button'

function DeleteModel({ deleteModal, closeDeleteModal, handleConfirmDelete }: { deleteModal: any, closeDeleteModal: () => void, handleConfirmDelete: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#1a1a19] border border-white/10 rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
                <h3 className="text-lg font-semibold text-white mb-2">Confirm Delete</h3>
                <p className="text-sm text-gray-400 mb-6">
                    Are you sure you want to delete <span className="text-white font-medium">"{deleteModal.jobTitle}"</span>? This action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-3">
                    <Button
                        onClick={closeDeleteModal}
                        className="px-4 py-2 bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 rounded-md text-sm cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm cursor-pointer"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModel