const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("../serviceKey.json");
const User = require('../models/UserSchema');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "yugioh-saver.appspot.com"
});

const bucket = admin.storage().bucket();

const saveImage = async (data) => {
    const { uid, name, url, description, archetype, attribute, atk, def, level, type } = data;

    const imageName = `${name.replace(/\s+/g, '_')}.jpg`;
    const imagePrefix = `${uid}_cards/${imageName}`;

    // Check if file already exists
    const [files] = await bucket.getFiles({ prefix: imagePrefix });
    if (files.length > 0) {
        console.log("File already exists");
        return { imageUrl: files[0].metadata.mediaLink }; 
    }

    const file = bucket.file(imagePrefix);
    const fileBuffer = Buffer.from(url, "base64");

    try {
        console.log('Starting to save file');
        await file.save(fileBuffer, { metadata: { contentType: "image/jpeg" } });

        console.log('Generating signed URL');
        const [signedUrl] = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' });

        console.log('Updating user with new card');
        const updatedUser = await User.findOneAndUpdate(
            { uid: uid },
            {
                $push: {
                    cards: {
                        name,
                        description,
                        archetype,
                        attribute,
                        atk,
                        def,
                        level,
                        type,
                        imageUrl: signedUrl
                    }
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            console.error('User not found');
            throw new Error('User not found');
        }

        console.log('Card added to user successfully');
        return { imageUrl: signedUrl };
    } catch (error) {
        console.error("Failed to save image or update user:", error);
        throw error; 
    }
};



module.exports = saveImage;


