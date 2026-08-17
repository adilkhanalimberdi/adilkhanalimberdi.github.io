import {Toaster} from "react-hot-toast";

function CustomToaster() {
    return (
        <Toaster
            containerStyle={{ zIndex: 100 }}
            toastOptions={{
                style: {
                    background: 'color-mix(in srgb, var(--theme-primary), white 15%)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-border)',
                },
                success: {
                    iconTheme: {
                        primary: '#4ade80',
                        secondary: 'var(--theme-primary)',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#f87171',
                        secondary: 'var(--theme-text-primary)',
                    },
                },
            }}
            position="bottom-right"
        />
    );
}

export default CustomToaster;