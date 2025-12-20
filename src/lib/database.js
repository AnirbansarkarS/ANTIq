import { supabase } from './supabaseClient'

// ============================================
// USER OPERATIONS
// ============================================

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) throw error
    return data
}

/**
 * Get user statistics (items listed, active bids, total sales)
 */
export const getUserStats = async (userId) => {
    const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) throw error
    return data
}

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, updates) => {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

    if (error) throw error
    return data
}

// ============================================
// ITEM OPERATIONS
// ============================================

/**
 * Get all active items (marketplace listings)
 */
export const getActiveItems = async (filters = {}) => {
    let query = supabase
        .from('items')
        .select('*, owner:users(id, name, avatar_url)')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

    // Apply filters
    if (filters.category) {
        query = query.eq('category', filters.category)
    }
    if (filters.listingType) {
        query = query.eq('listing_type', filters.listingType)
    }
    if (filters.search) {
        query = query.textSearch('search_vector', filters.search)
    }

    const { data, error } = await query
    if (error) throw error
    return data
}

/**
 * Get item by ID with full details
 */
export const getItemById = async (itemId) => {
    const { data, error } = await supabase
        .from('item_stats')
        .select('*')
        .eq('id', itemId)
        .single()

    if (error) throw error
    return data
}
/**
 * Create new item listing
 */
export const createItem = async (itemData) => {
    // For testing: if title contains "Test Item", set duration to 70 seconds
    const auctionEndTime = itemData.title?.includes('Test Item')
        ? new Date(Date.now() + 70000).toISOString()
        : itemData.auction_end_time || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    // Clean data to avoid "column not found" errors for missing schema fields
    const cleanData = {
        title: itemData.title,
        description: itemData.description,
        price: itemData.price,
        image_url: itemData.image_url,
        owner_id: itemData.owner_id,
        category: itemData.category || 'Artifacts',
        status: 'active',
        listing_type: 'auction',
        auction_end_time: auctionEndTime,
        listed_at: new Date().toISOString()
    };

    const { data, error } = await supabase
        .from('items')
        .insert(cleanData)
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Update item
 */
export const updateItem = async (itemId, updates) => {
    const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', itemId)
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Delete item
 */
export const deleteItem = async (itemId) => {
    const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', itemId)

    if (error) throw error
    return true
}

/**
 * Get user's items
 */
export const getUserItems = async (userId, status = null) => {
    let query = supabase
        .from('items')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false })

    if (status) {
        query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error
    return data
}

/**
 * Close auction and process winner
 */
export const closeAuction = async (itemId) => {
    // 1. Get the item details first
    const { data: item, error: itemError } = await supabase
        .from('items')
        .select('*')
        .eq('id', itemId)
        .single()

    if (itemError) throw itemError
    if (item.status !== 'active') return { item, highestBid: null }

    // 2. Get highest bid
    const { data: highestBid, error: bidError } = await supabase
        .from('bids')
        .select('*')
        .eq('item_id', itemId)
        .order('amount', { ascending: false })
        .limit(1)
        .maybeSingle()

    const hasWinner = highestBid !== null

    // 3. Update item status
    const newStatus = hasWinner ? 'sold' : 'ended'
    const { data: updatedItem, error: updateError } = await supabase
        .from('items')
        .update({ status: newStatus })
        .eq('id', itemId)
        .select()
        .single()

    if (updateError) throw updateError

    // 4. Create transaction and notifications if sold
    if (hasWinner) {
        await supabase.from('transactions').insert({
            item_id: itemId,
            buyer_id: highestBid.bidder_id,
            seller_id: item.owner_id,
            amount: highestBid.amount,
            status: 'completed'
        })

        // Notify winner
        await supabase.from('notifications').insert({
            user_id: highestBid.bidder_id,
            title: 'Auction Won! 🏆',
            content: `Congratulations! You won the auction for "${item.title}" with a bid of $${highestBid.amount}.`,
            type: 'auction_won',
            item_id: itemId,
            status: 'unread'
        })

        // Notify seller
        await supabase.from('notifications').insert({
            user_id: item.owner_id,
            title: 'Item Sold! 💰',
            content: `Your item "${item.title}" has been sold for $${highestBid.amount}.`,
            type: 'item_sold',
            item_id: itemId,
            status: 'unread'
        })
    }

    return { item: updatedItem, highestBid }
}

/**
 * Increment item view count
 */
export const incrementItemViews = async (itemId) => {
    const { error } = await supabase.rpc('increment', {
        table_name: 'items',
        row_id: itemId,
        column_name: 'views_count'
    })

    if (error) console.error('Error incrementing views:', error)
}

// ============================================
// BID OPERATIONS
// ============================================

/**
 * Place a bid on an item
 */
export const placeBid = async (itemId, bidderId, amount) => {
    const { data, error } = await supabase
        .from('bids')
        .insert({
            item_id: itemId,
            bidder_id: bidderId,
            amount,
            status: 'active'
        })
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Get bids for an item
 */
export const getItemBids = async (itemId) => {
    const { data, error } = await supabase
        .from('bids')
        .select('*, bidder:users(id, name, avatar_url)')
        .eq('item_id', itemId)
        .order('amount', { ascending: false })

    if (error) throw error
    return data
}

/**
 * Get user's active bids
 */
export const getUserBids = async (userId) => {
    const { data, error } = await supabase
        .from('bids')
        .select('*, item:items(*)')
        .eq('bidder_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

/**
 * Get highest bid for an item
 */
export const getHighestBid = async (itemId) => {
    const { data, error } = await supabase
        .from('bids')
        .select('*')
        .eq('item_id', itemId)
        .eq('status', 'active')
        .order('amount', { ascending: false })
        .limit(1)
        .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows
    return data
}

// ============================================
// TRANSACTION OPERATIONS
// ============================================

/**
 * Create a transaction (purchase)
 */
export const createTransaction = async (transactionData) => {
    const { data, error } = await supabase
        .from('transactions')
        .insert(transactionData)
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Get user's transactions (as buyer or seller)
 */
export const getUserTransactions = async (userId) => {
    const { data, error } = await supabase
        .from('transactions')
        .select('*, item:items(*), seller:users!seller_id(*), buyer:users!buyer_id(*)')
        .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

/**
 * Update transaction status
 */
export const updateTransaction = async (transactionId, updates) => {
    const { data, error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', transactionId)
        .select()
        .single()

    if (error) throw error
    return data
}

// ============================================
// FAVORITES OPERATIONS
// ============================================

/**
 * Add item to favorites
 */
export const addToFavorites = async (userId, itemId) => {
    const { data, error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, item_id: itemId })
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Remove item from favorites
 */
export const removeFromFavorites = async (userId, itemId) => {
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('item_id', itemId)

    if (error) throw error
}

/**
 * Get user's favorites
 */
export const getUserFavorites = async (userId) => {
    const { data, error } = await supabase
        .from('favorites')
        .select('*, item:items(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

/**
 * Check if item is favorited by user
 */
export const isItemFavorited = async (userId, itemId) => {
    const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('item_id', itemId)
        .single()

    if (error && error.code !== 'PGRST116') throw error
    return !!data
}

// ============================================
// NOTIFICATION OPERATIONS
// ============================================

/**
 * Create a notification
 */
export const createNotification = async (userId, notificationData) => {
    const { data, error } = await supabase
        .from('notifications')
        .insert({
            user_id: userId,
            ...notificationData,
            status: 'unread'
        })
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Get user's notifications
 */
export const getUserNotifications = async (userId, unreadOnly = false) => {
    let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (unreadOnly) {
        query = query.eq('is_read', false)
    }

    const { data, error } = await query
    if (error) throw error
    return data
}

/**
 * Mark notification as read
 */
export const markNotificationRead = async (notificationId) => {
    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)

    if (error) throw error
}

/**
 * Mark all notifications as read
 */
export const markAllNotificationsRead = async (userId) => {
    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false)

    if (error) throw error
}

// ============================================
// MESSAGE OPERATIONS
// ============================================

/**
 * Send a message
 */
export const sendMessage = async (senderId, recipientId, content, itemId = null) => {
    const { data, error } = await supabase
        .from('messages')
        .insert({
            sender_id: senderId,
            recipient_id: recipientId,
            content,
            item_id: itemId
        })
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Get conversation between two users
 */
export const getConversation = async (userId1, userId2) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*, sender:users!sender_id(*), recipient:users!recipient_id(*)')
        .or(`and(sender_id.eq.${userId1},recipient_id.eq.${userId2}),and(sender_id.eq.${userId2},recipient_id.eq.${userId1})`)
        .order('created_at', { ascending: true })

    if (error) throw error
    return data
}

/**
 * Get user's conversations
 */
export const getUserConversations = async (userId) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*, sender:users!sender_id(*), recipient:users!recipient_id(*)')
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false })

    if (error) throw error

    // Group by conversation partner
    const conversations = {}
    data.forEach(msg => {
        const partnerId = msg.sender_id === userId ? msg.recipient_id : msg.sender_id
        if (!conversations[partnerId] || new Date(msg.created_at) > new Date(conversations[partnerId].created_at)) {
            conversations[partnerId] = msg
        }
    })

    return Object.values(conversations)
}

// ============================================
// REALTIME SUBSCRIPTIONS
// ============================================

/**
 * Subscribe to item changes
 */
export const subscribeToItem = (itemId, callback) => {
    return supabase
        .channel(`item-${itemId}`)
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'items',
                filter: `id=eq.${itemId}`
            },
            callback
        )
        .subscribe()
}

/**
 * Subscribe to new bids on an item
 */
export const subscribeToItemBids = (itemId, callback) => {
    return supabase
        .channel(`item-bids-${itemId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'bids',
                filter: `item_id=eq.${itemId}`
            },
            callback
        )
        .subscribe()
}

/**
 * Subscribe to user notifications
 */
export const subscribeToNotifications = (userId, callback) => {
    return supabase
        .channel(`notifications-${userId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${userId}`
            },
            callback
        )
        .subscribe()
}

/**
 * Subscribe to user messages
 */
export const subscribeToMessages = (userId, callback) => {
    return supabase
        .channel(`messages-${userId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `recipient_id=eq.${userId}`
            },
            callback
        )
        .subscribe()
}

// ============================================
// SEARCH & DISCOVERY
// ============================================

/**
 * Search items with full-text search
 */
export const searchItems = async (searchQuery, filters = {}) => {
    let query = supabase
        .from('items')
        .select('*, owner:users(id, name, avatar_url)')
        .eq('status', 'active')

    if (searchQuery) {
        query = query.textSearch('search_vector', searchQuery)
    }

    if (filters.category) {
        query = query.eq('category', filters.category)
    }

    if (filters.minPrice) {
        query = query.gte('price', filters.minPrice)
    }

    if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice)
    }

    if (filters.condition) {
        query = query.eq('condition', filters.condition)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return data
}

/**
 * Get auctions ending soon
 */
export const getEndingSoonAuctions = async (hoursThreshold = 24) => {
    const { data, error } = await supabase
        .rpc('get_ending_soon_auctions', { hours_threshold: hoursThreshold })

    if (error) throw error
    return data
}
