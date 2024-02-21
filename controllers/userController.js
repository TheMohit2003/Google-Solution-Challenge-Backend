const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get user data including data from associated Issuer or Vendor based on the role
const getUserData = async (req, res) => {
    const userId = req.body.userId; // Assuming userId is provided in the request body
    try {
        // Fetch the user and include related Issuer or Vendor based on the user's role
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                issuer: {
                    select: {
                        userId: true,
                        name: true,
                        contact: true, // Assuming 'contact' corresponds to the intended 'phone' field
                        aadhar: true,
                        GST: true,
                        OrganizationName: true,
                        IssuerType: true,
                        createdAt: true,
                    },
                },
                vendor: {
                    select: {
                        userId: true,
                        name: true,
                        officeAddress: true, // Assuming 'officeAddress' corresponds to the intended 'address' field
                        contact: true, // Assuming 'contact' corresponds to the intended 'phone' field
                        aadhar: true,
                        GST: true,
                        OrganizationName: true,
                        WorkDescription: true,
                        Occupation: true,
                        createdAt: true,
                    },
                },
            },
        });

        // If user does not exist
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Modify user object based on the role to only send back relevant role data
        if (user.role === 'ISSUER' && user.issuer) {
            // Keep only issuer data
            user.data = user.issuer;
            delete user.issuer;
            delete user.vendor;
        } else if (user.role === 'VENDOR' && user.vendor) {
            // Keep only vendor data
            user.data = user.vendor;
            delete user.issuer;
            delete user.vendor;
        } else {
            // In case there is no associated Issuer or Vendor data
            user.data = null;
            delete user.issuer;
            delete user.vendor;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user data', error);
        res.status(500).json({ error: 'Internal server error', userId });
    }
};

module.exports = { getUserData };
